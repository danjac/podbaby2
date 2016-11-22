import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { partial } from 'lodash';

import App from '../containers/App';
import Bookmarks from '../containers/Bookmarks';
import Category from '../containers/Category';
import Categories from '../containers/Categories';
import Channel from '../containers/Channel';
import Channels from '../containers/Channels';
import Episode from '../containers/Episode';
import Episodes from '../containers/Episodes';
import History from '../containers/History';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import Settings from '../containers/Settings';
import Subscriptions from '../containers/Subscriptions';
import UserEpisodes from '../containers/UserEpisodes';
import PageNotFound from '../containers/PageNotFound';

import { requireAuth, resolveDefaultPage } from './utils';

export const createRouterConfigurator = (history, store, requireAuth, resolveDefaultPage) => {
 return (history, store) => (
    <Router history={history}>
      <Route path="/" component={App}>

        <IndexRoute onEnter={resolveDefaultPage} />

        <Route path="podcasts/">
          <Route path="all/" component={Episodes} />
          <Route path="me/" component={UserEpisodes} onEnter={requireAuth} />
          <Route path="bookmarks/" component={Bookmarks} onEnter={requireAuth} />
          <Route path="history/" component={History} onEnter={requireAuth} />
          <Route path=":id/" component={Episode} />
        </Route>

        <Route path="feeds/">
          <Route path="all/" component={Channels} />
          <Route path="me/" component={Subscriptions} onEnter={requireAuth} />
          <Route path="browse/" component={Categories} />
          <Route path="browse/:id/" component={Category} />
          <Route path=":id/" component={Channel} />
        </Route>

        <Route path="login/" component={Login} />
        <Route path="join/" component={Signup} />
        <Route path="settings/" component={Settings}  onEnter={requireAuth} />

        <Route path="*" component={PageNotFound} />

      </Route>
    </Router>
  );
};

export default function(history, store) {
  return createRouterConfigurator(
    history,
    store,
    partial(requireAuth, store),
    partial(resolveDefaultPage, store),
  )(history, store);
}
