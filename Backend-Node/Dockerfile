FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --only=prod

COPY src ./src
COPY config ./config

EXPOSE 3200
ENTRYPOINT ["npm", "run", "start"]
