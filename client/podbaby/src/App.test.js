import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    actions: {},
    player: {},
    alerts: [],
    auth: {
      isLoggedIn: false,
    },
  };
  ReactDOM.render(<App {...props} />, div);
});

