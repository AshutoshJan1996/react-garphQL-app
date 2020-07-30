import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://pet-library.moonhighway.com/',
  cache: new InMemoryCache()
});

export default client;