FROM node:19-alpine3.16

WORKDIR /usr/app

COPY frontend/src ./src
COPY frontend/public ./public
COPY frontend/package.json ./package.json
COPY frontend/package-lock.json ./package-lock.json

RUN npm install --quiet