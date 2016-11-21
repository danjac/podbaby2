import React from 'react';
import { shallow } from 'enzyme';

import { mockEpisode, mockEpisodeActions } from '../../utils/testing/mocks';

import Bookmarks from './index';

const defaultProps = {
  ...mockEpisodeActions(),
  episodes: [
    {
      ...mockEpisode(),
      bookmarked: true,
    },
  ],
  searchQuery: '',
  loading: false,
  authenticated: true,
  onSearch: jest.fn(),
  onUpdate: jest.fn(),
  onSelectPage: jest.fn(),
  onClearSearch: jest.fn(),
};

it('should render the component', () => {
  const rendered = shallow(<Bookmarks {...defaultProps} />);
  expect(rendered).toBeTruthy();
});
