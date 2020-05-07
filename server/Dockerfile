FROM node:10.16-alpine
COPY . /app
WORKDIR /app
# install ts node to run the application
RUN npm install -g ts-node typescript
# install only dependencies
RUN npm install --production
# start the application
CMD ts-node server.ts
EXPOSE 8000
