import ApolloClient from 'apollo-boost';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

let token = '';

const auth = localStorage.getItem('auth');
if (auth) {
  token = JSON.parse(auth).token;
}

const GraphQLClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  headers: {
    authorization: token,
  },
});

export default GraphQLClient;
