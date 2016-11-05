import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from '../store';
import { AppContainer } from './AppContainer';

it('renders without crashing', () => {
  const store = configureStore();
  const div = document.createElement('div');

  const props = {
    children: <div></div>,
  };

  ReactDOM.render(
    <Provider store={store}>
      <AppContainer {...props} />
    </Provider>,
    div);
});

