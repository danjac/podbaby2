import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './routes';
import configureStore from './store';

import { getCurrentUser } from './modules/auth';

import './index.css';


const store = configureStore();

store.dispatch(getCurrentUser());


ReactDOM.render(
  <Provider store={store}>
    <Routes store={store} />
  </Provider>,
  document.getElementById('root')
);
