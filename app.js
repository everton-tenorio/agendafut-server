const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3000;
const URL_GOAL = 'https://www.goal.com/br/listas/futebol-programacao-jogos-tv-aberta-fechada-onde-assistir-online-app/bltc0a7361374657315';

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(URL_GOAL);
    const html = response.data;
    const $ = cheerio.load(html);
    const json_goal = $('script[id="__NEXT_DATA__"]').text();
    const json_data = JSON.parse(json_goal);
    const get_slides = json_data.props.pageProps.content.slideList.slides;

    const tables = get_slides.map((data, index) => {
      const tableHtml = data.body.body;
      const diaJogo = data.headline;
      const table = cheerio.load(tableHtml)('table');

      // Remover linhas que contêm a frase "TEMPO REAL"
      table.find('th:contains("TEMPO REAL")').remove();
      table.find('td:contains("Tempo real")').remove();

      return {
        title: `Table ${index + 1}`,
        diaJogo,
        content: `<table>${table.html()}</table>`,
      };
    });

    res.json(tables);
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error);
    res.status(500).json({ error: 'Erro ao buscar as tabelas.' });
  }
});

app.get('/jogos', async (req, res) => {
  try {
    const response = await axios.get(URL_GOAL);
    const html = response.data;
    const $ = cheerio.load(html);
    const json_goal = $('script[id="__NEXT_DATA__"]').text();
    const json_data = JSON.parse(json_goal);
    const get_slides = json_data.props.pageProps.content.slideList.slides;

    const serializedData = get_slides.map((data, index) => {
      const diaJogo = data.headline;
      const tableHtml = data.body.body;
      const table = cheerio.load(tableHtml)('table');

      table.find('th:contains("TEMPO REAL")').remove();
      table.find('td:contains("Tempo real")').remove();

      const rows = table.find('tbody tr');
      const serializedContent = rows.map((_, row) => {
        const columns = $(row).find('td');
        const jogo = $(columns[0]).text();
        const campeonato = $(columns[1]).text();
        const horario = $(columns[2]).text();
        const ondePassa = $(columns[3]).text();

        return {
          jogo,
          campeonato,
          horario,
          ondePassa,
        };
      }).get();

      return {
        title: `Data ${index + 1}`,
        diaJogo,
        content: serializedContent,
      };
    });

    res.json(serializedData);
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error);
    res.status(500).json({ error: 'Erro ao buscar os dados serializados.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
