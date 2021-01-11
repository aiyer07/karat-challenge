import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import theme from './theme';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import merge from 'lodash/merge'
import TransactionAuthorizationsTP from './apollo/typepolicies/TransactionAuthorization'
import CardsTP from './apollo/typepolicies/Cards'
import GlobalTP from './apollo/typepolicies/Global'

const cache = new InMemoryCache({
  typePolicies: merge(
    GlobalTP(),
    TransactionAuthorizationsTP(),
    CardsTP()
  ),
});

const client = new ApolloClient({
  uri: 'http://localhost:3010/v1/graphql',
  cache: cache,
  headers: {
    'x-hasura-admin-secret': 'myadminsecretkey'
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
      <Router>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </Router>
  </ThemeProvider>,
  document.getElementById('root')
);
