FROM node:14.15.1-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY prisma ./prisma/
COPY .env ./

RUN yarn

RUN yarn prisma:generate

COPY . .

RUN yarn build


FROM node:14.15.1-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./dist

EXPOSE 3000
CMD [ "yarn", "start:prod" ]