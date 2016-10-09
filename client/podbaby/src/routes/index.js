import React from 'react';

import {
  browserHistory,
  Router,
  Route,
  IndexRoute } from 'react-router';

import App from '../App';

import Latest from './latest';
import Bookmarks from './bookmarks';
import Login from './login';
import Signup from './signup';

import { getAuthToken } from '../utils/storage';

export default function() {

  const requireAuth = (nextState, replace) => {
    // check auth token rather than state
    if (!getAuthToken()) {
      replace({
        pathname: '/login/',
      });
    }
  };

  return  (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Latest} />
        <Route path="/login/" component={Login} />
        <Route path="/signup/" component={Signup} />
        <Route path="/bookmarks/"
               component={Bookmarks}
               onEnter={requireAuth} />
      </Route>
    </Router>
  );
}
