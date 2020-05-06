import ApolloClient from 'apollo-boost';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

const GraphQLClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  headers: {
    authorization: localStorage.getItem('token'),
  },
});

export default GraphQLClient;
