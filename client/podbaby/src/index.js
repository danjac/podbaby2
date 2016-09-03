import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import App from './App';
import LatestEpisodes from './LatestEpisodes';
import Login from './Login';
import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={LatestEpisodes} />
      <Route path="/login/" component={Login} />
    </Route>
  </Router>,
  document.getElementById('root')
);
