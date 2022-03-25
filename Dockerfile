FROM node:14

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Copia mi directorio actual dentro del directorio de WORKDIR
COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]