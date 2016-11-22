import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from '../../store';
import { App } from './index';

it('renders without crashing', () => {
  const store = configureStore();
  const div = document.createElement('div');

  const props = {
    children: <div></div>,
  };

  ReactDOM.render(
    <Provider store={store}>
      <App {...props} />
    </Provider>,
    div);
});

