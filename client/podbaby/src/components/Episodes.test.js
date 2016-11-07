import React from 'react';
import { shallow } from 'enzyme';

import { mockEpisode, mockEpisodeActions } from '../test-utils/mocks';

import Episodes from './Episodes';
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
  const rendered = shallow(<Episodes {...defaultProps} />);
  expect(rendered).toBeTruthy();
});
