FROM node:20-alpine

WORKDIR /usr/app

COPY package*.json  ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

CMD [  "npm", "run", "start:migrate:prod" ]
