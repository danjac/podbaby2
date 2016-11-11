import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { partial } from 'lodash';

import AppContainer from '../containers/AppContainer';
import BookmarksContainer from '../containers/BookmarksContainer';
import CategoriesContainer from '../containers/CategoriesContainer';
import ChannelContainer from '../containers/ChannelContainer';
import ChannelsContainer from '../containers/ChannelsContainer';
import EpisodeContainer from '../containers/EpisodeContainer';
import EpisodesContainer from '../containers/EpisodesContainer';
import UserEpisodesContainer from '../containers/UserEpisodesContainer';
import LoginContainer from '../containers/LoginContainer';

import { requireAuth, resolveDefaultPage } from './utils';

export const createRouterConfigurator = (history, store, requireAuth, resolveDefaultPage) => {
 return (history, store) => (
    <Router history={history}>
      <Route path="/" component={AppContainer}>

        <IndexRoute onEnter={resolveDefaultPage} />

        <Route path="podcasts/">
          <Route path="all/" component={EpisodesContainer} />
          <Route path="me/" component={UserEpisodesContainer} onEnter={requireAuth} />
          <Route path="bookmarks/" component={BookmarksContainer} onEnter={requireAuth} />
          <Route path=":id/" component={EpisodeContainer} />
        </Route>

        <Route path="feeds/">
          <Route path="all/" component={ChannelsContainer} />
          <Route path="me/" component={ChannelsContainer} />
          <Route path="browse/" component={CategoriesContainer} />
          <Route path=":id/" component={ChannelContainer} />
        </Route>

        <Route path="login/" component={LoginContainer} />

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
