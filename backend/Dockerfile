FROM node:lts-alpine as production

RUN echo "Asia/Bangkok" > /etc/timezone

WORKDIR ./app

#ARG NODE_ENV=production

COPY package.json ./

# Yarn
COPY yarn.lock ./
RUN yarn install --network-timeout 1000000

COPY . .

CMD ["yarn", "start"]