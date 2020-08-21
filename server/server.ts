import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import ApolloConfig from './src/graphql';

const app = express();

// add all the middleware
if (process.env.NODE_ENV !== 'production') {
  app.use('*', cors());
  require('dotenv').config()
}

// init the apollo server
const server = new ApolloServer(ApolloConfig);
server.applyMiddleware({ app });

// init the subscription handler
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

// construct the mongo connection string
const mongoUrl = `mongodb://graphql:zdy940717@localhost:27017/?authSource=admin&readPreference=primary&ssl=false`;

// init the mongo connection
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // start the server once mongo is connected
    httpServer.listen(8888)

    console.log('The server has started');
  })
  .catch((err) => {
    console.log(err);
  });

// graceful shutdown
process.on('SIGINT', () => {
  mongoose.disconnect().then(
    () => {
      process.exit(0);
    },
  ).catch(() => {
    process.exit(1);
  });
});
