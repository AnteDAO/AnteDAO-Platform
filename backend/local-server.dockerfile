FROM node:12-alpine
RUN mkdir /anteda-code \
    && apk update && apk add curl
WORKDIR /antedao
COPY package*.json ./
RUN npm i -g @adonisjs/cli \
    && npm install && npm cache clean --force
COPY . .
RUN cp .env.prod .env
EXPOSE 3001
CMD [ "node", "server" ]
