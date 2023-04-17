FROM node:19-alpine
WORKDIR /app

COPY package*.json pnpm-lock.yaml* ./
RUN npm install
COPY . .

RUN npm run build
ENV NODE_ENV production

EXPOSE 3000
ENV PORT 3000

CMD ["npm", "start"]