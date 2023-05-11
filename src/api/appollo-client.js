import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: 'https://frontend-test-api.aircall.io/graphql',
  cache: new InMemoryCache(),
});

export default apolloClient;
