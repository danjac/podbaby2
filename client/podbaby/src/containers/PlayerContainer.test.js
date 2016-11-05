import React from 'react';
import { shallow } from 'enzyme';

import { PlayerContainer } from './PlayerContainer';

it('should render the container', () => {

  const episode = {
    id: 1,
    title: 'test',
    channel: {},
  };

  const props = {
    episode,
    currentTime: 30,
    authenticated: false,
    onAddBookmark: jest.fn(),
    onRemoveBookmark: jest.fn(),
    onSubscribe: jest.fn(),
    onUnsubscribe: jest.fn(),
    onStopPlayer: jest.fn(),
    onStartPlayer: jest.fn(),
  };

  const rendered = shallow(<PlayerContainer {...props} />);
  expect(rendered).toBeTruthy();
});
