import React from 'react';
import { shallow } from 'enzyme';

import {
  mockEpisode,
  mockEpisodeActions,
} from '../mocks';

import { PlayerContainer } from './PlayerContainer';

it('should render the container', () => {

  const props = {
    episode: mockEpisode(),
    currentTime: 30,
    authenticated: false,
    ...mockEpisodeActions(),
  };

  const rendered = shallow(<PlayerContainer {...props} />);
  expect(rendered).toBeTruthy();
});
