import React from 'react';
import { shallow } from 'enzyme';

import {
  mockEpisode,
  mockEpisodeActions,
} from '../test-utils/mocks';

import { EpisodesContainer } from './EpisodesContainer';

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
  const rendered = shallow(<EpisodesContainer {...props} />);
  expect(rendered).toBeTruthy();
});
