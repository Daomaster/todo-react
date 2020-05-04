import { ApolloServerExpressConfig } from 'apollo-server-express';
import { importSchema } from 'graphql-import'

const typeDefs = importSchema('**/*.graphql');
const resolvers = {};

const apolloConfig: ApolloServerExpressConfig = {
    typeDefs,
    resolvers,
    introspection: true,
    context: async ({ req, connection, payload }: any) => {
        if (connection) {
            return { isAuth: payload.authToken };
        }
        return { isAuth: req.isAuth };
    },
    playground: process.env.NODE_ENV !== 'production'
};

export default apolloConfig;
