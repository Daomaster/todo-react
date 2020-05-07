import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import ApolloConfig from './src/graphql';

const app = express();

// add all the middleware
if (process.env.NODE_ENV !== 'production') {
  app.use('*', cors());
}

// init the apollo server
const server = new ApolloServer(ApolloConfig);
server.applyMiddleware({ app });

// construct the mongo connection string
const mongoUrl = `mongodb+srv://${process.env.MONGO_USER}:${
  process.env.MONGO_PASSWORD
}@${process.env.MONGO_SERVER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

// init the mongo connection
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // start the server once mongo is connected
    app.listen(8000);

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
