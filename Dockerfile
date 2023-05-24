FROM node:16.20.0-bullseye AS build

WORKDIR /app

COPY --chown=node:node . .
RUN npm install -g npm@9.6.7
RUN npm i -g @angular/cli
RUN npm ci
EXPOSE 4200