FROM node:12-alpine
RUN mkdir /antedao-code \
    && apk update && apk add curl
WORKDIR /antedao-code
COPY package*.json ./
RUN npm i -g @adonisjs/cli \
    && npm install && npm cache clean --force
COPY . .
RUN cp .env.prod .env
CMD adonis migration:run && sleep 10 && adonis seed
