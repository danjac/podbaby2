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


export default function({ store }) {

  const requireAuth = (nextState, replace) => {
    const { auth: { isLoggedIn } } = store.getState();
    if (!isLoggedIn) {
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
        <Route path="/bookmarks/" component={Bookmarks} onEnter={requireAuth} />
      </Route>
    </Router>
  );
}
