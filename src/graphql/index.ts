import { ApolloServerExpressConfig } from 'apollo-server-express';
import resolvers from './resolvers';
import typeDefs from './schemas';
import { contextHandler } from './context';

const ApolloConfig: ApolloServerExpressConfig = {
  typeDefs,
  resolvers,
  introspection: true,
  context: contextHandler,
  playground: process.env.NODE_ENV !== 'production',
};

export default ApolloConfig;
