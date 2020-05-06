import { importSchema } from 'graphql-import';

const typeDefs = importSchema('**/*.graphql');

export default typeDefs;
