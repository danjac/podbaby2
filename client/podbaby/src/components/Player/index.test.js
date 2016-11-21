import React from 'react';

import { shallow } from 'enzyme';

import {
  mockEpisode,
  mockEpisodeActions,
} from '../../utils/testing/mocks';

import Player from './index';

const createDefaultProps = () => {
  return {
    authenticated: false,
    episode: mockEpisode(),
    onTimeUpdate: jest.fn(),
    ...mockEpisodeActions(),
  };
};

it('should render the component', () => {
  const props = createDefaultProps();
  const rendered = shallow(<Player {...props} />);
  expect(rendered).toBeTruthy();
});
