import React from 'react';

import { Router, Route, IndexRoute } from 'react-router';


import AppContainer from '../containers/AppContainer';
import CategoriesContainer from '../containers/CategoriesContainer';
import EpisodeContainer from '../containers/EpisodeContainer';
import EpisodesContainer from '../containers/EpisodesContainer';
import LoginContainer from '../containers/LoginContainer';

export default function(history, store) {

  //const requireAuth = (nextState, replace) => {
    //const { authenticated } = store.getState().auth;
    //if (!authenticated) {
      //replace({
        //pathname: '/login/',
      //});
    //}
  //};

  const resolveDefaultPage = (nextState, replace) => {
    const { authenticated } = store.getState().auth;
    const pathname = authenticated ? '/podcasts/me/' : '/podcasts/all/';
    replace({ pathname });
  };

  return  (
    <Router history={history}>
      <Route path="/" component={AppContainer}>
        <IndexRoute onEnter={resolveDefaultPage} />
        <Route path="podcasts/">
          <Route path="all/" component={EpisodesContainer} />
          <Route path="me/" component={EpisodesContainer} />
          <Route path=":id/" component={EpisodeContainer} />
        </Route>
        <Route path="feeds/">
          <Route path="browse/" component={CategoriesContainer} />
        </Route>
        <Route path="login/" component={LoginContainer} />
        {/*
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
        */}

      </Route>
    </Router>
  );

}
