import React from 'react';
import { shallow } from 'enzyme';

import {
  mockEpisode,
  mockEpisodeActions,
} from '../../mocks';

import UserEpisodes from './UserEpisodes';

const defaultProps = () => {
  return {
    episodes: [
      mockEpisode(),
    ],
    dispatch: jest.fn(),
    onSearch: jest.fn(),
    onSelectPage: jest.fn(),
    onClearSearch: jest.fn(),
    loading: false,
    authenticated: false,
    ...mockEpisodeActions(),
  };
};

it('should render the container', () => {
  const props = defaultProps();
  const rendered = shallow(<UserEpisodes {...props} />);
  expect(rendered).toBeTruthy();
});
