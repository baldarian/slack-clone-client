import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import { Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import history from './history';
import client from './client';
import { PrivateRoute, PublicRoute } from './components/Route';

import Register from './pages/Register';
import Login from './pages/Login';
import CreateTeam from './pages/CreateTeam';
import ViewTeam from './pages/ViewTeam';

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
        <Router history={history}>
          <Switch>
            <PublicRoute path="/register" component={Register} />
            <PublicRoute path="/login" component={Login} />
            <PrivateRoute path="/create-team" component={CreateTeam} />
            <PrivateRoute path="/:teamId?/:channelId?" component={ViewTeam} />
          </Switch>
        </Router>
        <ToastContainer hideProgressBar autoClose={2000} />
      </ApolloProvider>
    );
  }
}

export default App;
