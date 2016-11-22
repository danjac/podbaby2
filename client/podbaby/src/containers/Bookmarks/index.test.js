import React from 'react';
import { shallow } from 'enzyme';

import {
  mockEpisode,
  mockEpisodeActions,
} from '../../utils/testing/mocks';

import { Bookmarks } from './index';

const defaultProps = () => {
  return {
    episodes: [
      {
        ...mockEpisode(),
        bookmarked: true,
      },
    ],
    onSearch: jest.fn(),
    onSelectPage: jest.fn(),
    onClearSearch: jest.fn(),
    loading: false,
    authenticated: true,
    ...mockEpisodeActions(),
  };
};

it('should render the container', () => {
  const props = defaultProps();
  const rendered = shallow(<Bookmarks {...props} />);
  expect(rendered).toBeTruthy();
});
