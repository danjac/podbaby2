import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

import App from './App';
import configureStore from './store';

import Latest from './routes/latest';
import Login from './routes/login';

import { getCurrentUser } from './modules/auth';

import './index.css';

const store = configureStore();

store.dispatch(getCurrentUser());


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Latest} />
        <Route path="/login/" component={Login} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
