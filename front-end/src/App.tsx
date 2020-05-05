import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import TodoPage from './pages/TodoPage/TodoPage';
import { ApolloProvider } from '@apollo/react-hooks';
import GraphQLClient from './lib/graphql/client';

function App() {
  const client = GraphQLClient;

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Redirect from="/" to="/login" exact />
            <Route path="/login" component={LoginPage} />
            <Route path="/todo" component={TodoPage} />
          </Switch>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
