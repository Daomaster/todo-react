import { ApolloServerExpressConfig } from 'apollo-server-express';
import resolvers from '../graphql/resolvers';
import typeDefs from '../graphql/schemas';
import { GraphQLContext, UserData } from '../graphql/context';
import Models from '../models';

// custom apollo config that can take a dynamic context
// due to https://github.com/apollographql/apollo-server/issues/2277

const ApolloConfig: ApolloServerExpressConfig = {
  typeDefs,
  resolvers,
  introspection: true,
};

export default (userData: UserData): ApolloServerExpressConfig => {
  ApolloConfig.context = ({ req }: any): (GraphQLContext | null) => ({
    Models,
    Auth: userData,
  });

  return ApolloConfig;
};
