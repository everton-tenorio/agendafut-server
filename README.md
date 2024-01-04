# futlive server

Um aplicativo node.js que extrai informações sobre os jogos de futebol da Goal.com e as disponibiliza em formato JSON, funcionando de certa forma como uma API. Útil para acompanhar as programações de jogos de futebol de várias ligas e torneios.

### API

Com o objetivo de fornecer apenas as informações dos jogos sem se preocupar com formatações ou tratamento de dados, Essa API tem um único endpoint `/` que retorna as informações sobre os jogos de futebol em formato JSON. 
Os dados incluem detalhes sobre os jogos, como data e hora, equipes envolvidas e outras informações relevantes.

Bibliotecas utilizadas:

- Express: Para criar um servidor web simples que expõe os dados em formato JSON.
- Axios: Para fazer solicitações HTTP e obter o conteúdo da Goal.com.
- Cheerio: Para analisar e extrair dados relevantes do HTML da página.

## Testando 
Na branch `dev` há alguns arquivos docker para visualizar como essa aplicação funciona
```bash
docker-compose up -d
```

Você pode acessar as informações sobre os jogos de futebol da seguinte maneira:

```curl
GET http://localhost:3000/
```

Isso retornará os dados JSON com as programações dos jogos.