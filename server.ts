import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import compression from 'compression';
import { ApolloServer } from 'apollo-server-express';
import ApolloConfig from './src/graphql';

const app = express();

// add all the middleware
app.use('*', cors());
app.use(compression());

// init the apollo server
const server = new ApolloServer(ApolloConfig);
server.applyMiddleware({ app });

// construct the mongo connection string
const mongoUrl = `mongodb+srv://${process.env.MONGO_USER}:${
  process.env.MONGO_PASSWORD
}@cluster0-replz.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

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
