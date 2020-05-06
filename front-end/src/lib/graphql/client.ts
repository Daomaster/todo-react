import ApolloClient from 'apollo-boost';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

const GraphQLClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri:
    process.env.NODE_ENV === 'production'
      ? '/graphql'
      : 'http://localhost:8000/graphql',
  // this allows the each request to get the token from local storage
  // not a good way to handle this but it works :)
  request: (operation) => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
});

export default GraphQLClient;
