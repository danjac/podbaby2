import React from 'react';

import { Router, Route, IndexRoute } from 'react-router';

import App from '../App';

import Podcasts from './podcasts';
import Latest from './latest';
import Bookmarks from './bookmarks';
import Login from './login';
import Signup from './signup';


export default function(history, store) {

  const requireAuth = (nextState, replace) => {
    const { isLoggedIn } = store.getState().auth;
    if (!isLoggedIn) {
      replace({
        pathname: '/login/',
      });
    }
  };

  return  (
    <Router history={history}>
      <Route path="/" component={App}>
        <Route component={Podcasts}>
          <IndexRoute component={Latest} />
          <Route path="playlist/"
                 component={Bookmarks}
                 onEnter={requireAuth} />
        </Route>
        <Route path="/login/" component={Login} />
        <Route path="/signup/" component={Signup} />
      </Route>
    </Router>
  );

}
