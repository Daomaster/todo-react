import { ApolloServerExpressConfig } from 'apollo-server-express';
import resolvers from './resolvers';
import typeDefs from './schemas';
import { contextHandler } from './context';
import WebSocket from 'ws';
import { validateToken } from './auth';

// token is under the Authorization header
interface WebSocketConnectionParams {
  Authorization?: string;
}

const ApolloConfig: ApolloServerExpressConfig = {
  typeDefs,
  resolvers,
  subscriptions: {
    onConnect: (connectionParams: WebSocketConnectionParams, webSocket: WebSocket) => {
      // check if the token is present
      if (connectionParams.Authorization) {
        const userData = validateToken(connectionParams.Authorization);

        return userData;
      }

      throw new Error('There is no auth token present');
    }, 
  },
  introspection: true,
  context: contextHandler,
  playground: process.env.NODE_ENV !== 'production',
};

export default ApolloConfig;
