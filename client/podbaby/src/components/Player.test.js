import React from 'react';

import {
  shallow,
} from 'enzyme';

import Player from './Player';

const createDefaultProps = () => {
  return {
    episode: {
      isPlaying: false,
      channel: {
        name: 'The Joe Rogan Experience',
      },
    },
    authenticated: false,
    onStartPlayer: jest.fn(),
    onStopPlayer: jest.fn(),
    onAddBookmark: jest.fn(),
    onRemoveBookmark: jest.fn(),
    onSubscribe: jest.fn(),
    onUnsubscribe: jest.fn(),
  };
};

it('should render the component', () => {
  const props = createDefaultProps();
  const rendered = shallow(<Player {...props} />);
  expect(rendered).toBeTruthy();
});
