import React from 'react';

import { Router, Route, IndexRoute } from 'react-router';

import App from '../App';

import Podcasts from './podcasts';
import Episode from './episode';
import Episodes from './episodes';
import Bookmarks from './bookmarks';
import Feeds from './feeds';
import Channels from './channels';
import Subscriptions from './subscriptions';
import Categories from './categories';
import Login from './login';
import Signup from './signup';
import NotFound from './not-found';


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
          <IndexRoute component={Episodes} />
          <Route path="playlist/" component={Bookmarks} onEnter={requireAuth} />
        </Route>
        <Route path="podcasts/:id/" component={Episode} />
        <Route path="/feeds/" component={Feeds}>
          <IndexRoute component={Channels} />
          <Route path="me/" component={Subscriptions} onEnter={requireAuth} />
          <Route path="browse/" component={Categories} />
        </Route>
        <Route path="login/" component={Login} />
        <Route path="signup/" component={Signup} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );

}
