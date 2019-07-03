import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import decode from 'jwt-decode';

const isAuthenticated = () => {
  const token = localStorage.getItem('access_token');

  try {
    decode(token);

    return true;
  } catch (e) {
    return false;
  }
};

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);
