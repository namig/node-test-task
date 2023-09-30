FROM node:18.17.0-alpine as dev

RUN mkdir /app && chown node:node /app

USER node

WORKDIR /app

COPY ./docker/node/entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

FROM dev as prod

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run build

ENTRYPOINT ["npm"]
CMD ["run", "start"]
