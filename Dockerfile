FROM node:16.20.0-bullseye AS build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

#copia todos os arquivos do projeto para o container
COPY . . 
#instala as dependencias do projeto
RUN npm install -g npm@latest
RUN npm i -g @angular/cli
RUN npm install

#rodando o servidor da aplicação e expondo a porta 4200
CMD ng serve --host 0.0.0.0 --port 4200
