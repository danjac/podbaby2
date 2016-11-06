import React from 'react';
import { shallow } from 'enzyme';

import {
  fakeEpisode,
  fakeEpisodeActions,
} from '../test-utils';

import { PlayerContainer } from './PlayerContainer';

it('should render the container', () => {

  const props = {
    episode: fakeEpisode(),
    currentTime: 30,
    authenticated: false,
    ...fakeEpisodeActions(),
  };

  const rendered = shallow(<PlayerContainer {...props} />);
  expect(rendered).toBeTruthy();
});
