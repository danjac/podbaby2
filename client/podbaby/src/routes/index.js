import React from 'react';

import {
  browserHistory,
  Router,
  Route,
  IndexRoute } from 'react-router';

import App from '../App';

import Latest from './latest';
import Login from './login';
import Signup from './signup';


// const allEpisodes = <Episodes fetchUrl={} name="all" />

export default function() {
  return  (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Latest} />
        <Route path="/login/" component={Login} />
        <Route path="/signup/" component={Signup} />
      </Route>
    </Router>
  );
}
