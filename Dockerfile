FROM node:20-alpine

# Cria um diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o package.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o código do aplicativo para o diretório /app
COPY . .

# Inicia app.js
CMD [ "node", "app.js" ]
