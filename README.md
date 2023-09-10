# futlive server


Goal.com Football Match Schedule Scraper

Este é um aplicativo Node.js que extrai informações sobre os jogos de futebol da Goal.com e as disponibiliza em formato JSON. Ele pode ser útil para acompanhar as programações de jogos de futebol de várias ligas e torneios.

Este aplicativo utiliza as seguintes bibliotecas:

- Express: Para criar um servidor web que expõe os dados em formato JSON.
- Axios: Para fazer solicitações HTTP e obter o conteúdo da página da web da Goal.com.
- Cheerio: Para analisar e extrair dados do HTML da página.

O aplicativo faz uma solicitação para a página da Goal.com que contém as informações sobre os jogos e, em seguida, utiliza o Cheerio para analisar o HTML e extrair os dados relevantes. Ele remove informações não desejadas, como os jogos em tempo real, e formata os dados em JSON.

## Dockerfile

```bash
docker build -t futlive .
docker run --name futlivesv -d -p <ip>:<port>:3000 futlive
```

## API

A API deste aplicativo possui um único endpoint:

- /: Retorna as informações sobre os jogos de futebol em formato JSON. Os dados incluem detalhes sobre os jogos, como data e hora, equipes envolvidas e outras informações relevantes.

### Exemplo de Uso

Você pode acessar as informações sobre os jogos de futebol da seguinte maneira:

```curl
GET http://localhost:3000/
```

Isso retornará os dados JSON com as programações dos jogos.

## Notas

Este aplicativo é um exemplo simples de web scraping e pode ser personalizado para atender às suas necessidades específicas. Lembre-se de verificar periodicamente se o site-alvo não fez mudanças em sua estrutura HTML, que podem afetar a funcionalidade deste aplicativo.
