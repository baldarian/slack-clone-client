import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { toast } from 'react-toastify';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, extensions }) => {
      if (extensions.code !== 'BAD_USER_INPUT') {
        toast.error(message);
      }
    });
  }
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      'x-token': localStorage.getItem('access_token')
    }
  });

  return forward(operation);
});

const httpLink = new HttpLink({
  uri: 'http://localhost:8040/'
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:8040/subscriptions`,
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: () => ({
      accessToken: localStorage.getItem('access_token')
    })
  }
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  ApolloLink.from([errorLink, authLink, httpLink])
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default client;
