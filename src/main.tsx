import React from 'react';
import ReactDOM from 'react-dom/client';
import WrappedApp from './App.tsx';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './index.css';

const httpLink = createHttpLink({
  uri: 'https://syn-api-prod.herokuapp.com/graphql',
});
const authLink = setContext((_, { headers }) => {
  const token = import.meta.env.VITE_AUTH_TOKEN;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <WrappedApp />
    </ApolloProvider>
  </React.StrictMode>
);
