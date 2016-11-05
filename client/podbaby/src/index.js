import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';

import configureRoutes from './routes';
import configureStore from './store';

import { fetchUser } from './actions/auth';

import './index.css';

const store = configureStore();
const routes = configureRoutes(browserHistory, store);

store.dispatch(fetchUser());


ReactDOM.render(
  <Provider store={store}>
  {routes}
  </Provider>,
  document.getElementById('root')
);
