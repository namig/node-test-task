#!/bin/sh
set -x #echo on

#if [ ! -d node_modules ]; then
  npm install
#fi

npm run dev
