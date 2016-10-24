import React from 'react';

import { Router, Route, IndexRoute } from 'react-router';

import App from '../App';

import EpisodeDetail from '../containers/episodes/detail';
import AllEpisodes from '../containers/episodes/all';
import UserEpisodes from '../containers/episodes/user';
import Bookmarks from '../containers/episodes/bookmarks';
import Channels from '../containers/channels/channels';
import Subscriptions from '../containers/channels/subscriptions';
import Categories from '../containers/channels/categories';
import Login from '../containers/auth/login';
import Signup from '../containers/auth/signup';

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

  const resolveDefaultPage = (nextState, replace) => {
    const { isLoggedIn } = store.getState().auth;
    const pathname = isLoggedIn ? '/podcasts/me/' : '/podcasts/all/';
    replace({ pathname });
  };

  return  (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute onEnter={resolveDefaultPage} />

        <Route path="podcasts/">
          <Route path="all/" component={AllEpisodes} />
          <Route path="me/" component={UserEpisodes} onEnter={requireAuth} />
          <Route path="starred/" component={Bookmarks} onEnter={requireAuth} />
          <Route path=":id/" component={EpisodeDetail} />
        </Route>

        <Route path="feeds/">
          <Route path="all/" component={Channels} />
          <Route path="me/" component={Subscriptions} onEnter={requireAuth} />
          <Route path="browse/" component={Categories} />
        </Route>

        <Route path="account/">
          <Route path="login/" component={Login} />
          <Route path="signup/" component={Signup} />
        </Route>

        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );

}
