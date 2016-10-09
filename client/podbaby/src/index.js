import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';


import configureRoutes from './routes';
import configureStore from './store';
import { getCurrentUser } from './modules/auth';

import './index.css';


const store = configureStore();
const routes = configureRoutes(browserHistory, store);

store.dispatch(getCurrentUser());


ReactDOM.render(
  <Provider store={store}>
  {routes}
  </Provider>,
  document.getElementById('root')
);
