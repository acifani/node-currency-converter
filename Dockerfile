FROM node:latest

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm config set loglevel warn && npm ci

COPY . .
RUN npm run build

CMD ["npm", "run", "serve"]
