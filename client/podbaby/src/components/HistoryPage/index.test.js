import React from 'react';
import { shallow } from 'enzyme';

import { mockEpisode, mockEpisodeActions } from '../../mocks';

import History from './index';

const defaultProps = {
  ...mockEpisodeActions(),
  episodes: [
    {
      ...mockEpisode(),
      lastPlayed: new Date(),
    },
  ],
  searchQuery: '',
  loading: false,
  authenticated: true,
  onSearch: jest.fn(),
  onUpdate: jest.fn(),
  onSelectPage: jest.fn(),
  onClearSearch: jest.fn(),
  onClearHistory: jest.fn(),
};

it('should render the component', () => {
  const rendered = shallow(<History {...defaultProps} />);
  expect(rendered).toBeTruthy();
});
