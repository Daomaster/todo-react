FROM node:10.16-alpine
WORKDIR /app
# install ts node to run the application
RUN npm install -g ts-node
COPY package*.json /app
# install only dependencies
RUN npm install --production
COPY . /app
# start the application
CMD ts-node server.ts
EXPOSE 8000
