import React from 'react';
import { shallow } from 'enzyme';

import { mockEpisode, mockEpisodeActions } from '../../utils/testing/mocks';

import EpisodesPage from './index';

const defaultProps = {
  ...mockEpisodeActions(),
  episodes: [mockEpisode()],
  header: 'All podcasts',
  searchQuery: '',
  loading: false,
  authenticated: false,
  onSearch: jest.fn(),
  onUpdate: jest.fn(),
  onSelectPage: jest.fn(),
  onClearSearch: jest.fn(),
};

it('should render the component', () => {
  const rendered = shallow(<EpisodesPage {...defaultProps} />);
  expect(rendered).toBeTruthy();
});
