FROM node:14.15.1-alpine
RUN openssl version -v
RUN uname -a
RUN echo $DATABASE_URL
WORKDIR /app
RUN npm install -g @prisma/cli --unsafe-perm
ADD ./ ./prisma/

CMD [ "prisma", "migrate", "up", "--experimental"]