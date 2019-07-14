import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import { Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';

import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import history from './history';
import client from './client';
import { PrivateRoute, PublicRoute } from './components/Route';

import theme from './theme';
import Register from './pages/Register';
import Login from './pages/Login';
import CreateTeam from './pages/CreateTeam';
import Chat from './pages/Chat';

class App extends Component {
  state = {
    hasError: false
  };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return 'something bad happened. please reload the window';
    }

    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <>
            <Router history={history}>
              <Switch>
                <PublicRoute path="/register" component={Register} />
                <PublicRoute path="/login" component={Login} />
                <PrivateRoute path="/create-team" component={CreateTeam} />
                <PrivateRoute path="/:conversationId?" component={Chat} />
              </Switch>
            </Router>
            <ToastContainer hideProgressBar autoClose={2000} />
          </>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
