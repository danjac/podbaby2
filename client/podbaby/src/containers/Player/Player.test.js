import React from 'react';
import { shallow } from 'enzyme';

import {
  mockEpisode,
  mockEpisodeActions,
} from '../../mocks';

import Player from './Player';

it('should render the container', () => {

  const props = {
    episode: mockEpisode(),
    currentTime: 30,
    authenticated: false,
    ...mockEpisodeActions(),
  };

  const rendered = shallow(<Player {...props} />);
  expect(rendered).toBeTruthy();
});
