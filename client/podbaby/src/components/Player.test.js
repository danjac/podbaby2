import React from 'react';

import { shallow } from 'enzyme';

import {
  mockEpisode,
  mockEpisodeActions,
} from '../test-utils/mocks';

import Player from './Player';

const createDefaultProps = () => {
  return {
    authenticated: false,
    episode: mockEpisode(),
    ...mockEpisodeActions(),
  };
};

it('should render the component', () => {
  const props = createDefaultProps();
  const rendered = shallow(<Player {...props} />);
  expect(rendered).toBeTruthy();
});
