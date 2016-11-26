import React from 'react';
import { shallow } from 'enzyme';

import { mockEpisode, mockEpisodeActions } from '../../mocks';

import EpisodesPage from './EpisodesPage';

const defaultProps = {
  ...mockEpisodeActions(),
  episodes: [mockEpisode()],
  title: 'All podcasts',
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
