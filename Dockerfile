FROM node:19-alpine3.16

WORKDIR /app

COPY frontend/ ./

COPY repos.md ./public

RUN npm install --quiet