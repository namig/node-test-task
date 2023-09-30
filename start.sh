#!/usr/bin/env bash

docker-compose up -d

cd client
npm install
npm run build
npm i -g .

# run `car` command or `node ./dist/index.js`
