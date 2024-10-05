# Etapa 1: Construção
FROM node:18 AS build

# Configura o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência para a imagem
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código fonte
COPY . .

# Compila o TypeScript
RUN npm run build

# Etapa 2: Execução
FROM node:18 AS production

WORKDIR /app

# Copia apenas os arquivos necessários da etapa de construção
COPY --from=build /app/dist ./dist
COPY package*.json ./
COPY .env ./

# Instala apenas as dependências de produção
RUN npm install --only=production

# Expõe a porta que o app vai usar
EXPOSE 3100

# Comando para rodar o app
CMD ["npm", "start"]