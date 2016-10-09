import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    actions: {
      onDismissAlert: jest.fn(),
      onStopPlayer: jest.fn(),
    },
    playingEpisode: null,
    alerts: [],
    auth: {
      isLoggedIn: false,
    },
    router: {},
    children: <div></div>,
  };
  ReactDOM.render(<App {...props} />, div);
});

