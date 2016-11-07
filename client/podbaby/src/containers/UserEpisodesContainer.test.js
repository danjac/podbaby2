import React from 'react';
import { shallow } from 'enzyme';

import {
  mockEpisode,
  mockEpisodeActions,
} from '../test-utils/mocks';

import { UserEpisodesContainer } from './UserEpisodesContainer';

const defaultProps = () => {
  return {
    episodes: [
      mockEpisode(),
    ],
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
  const rendered = shallow(<UserEpisodesContainer {...props} />);
  expect(rendered).toBeTruthy();
});
