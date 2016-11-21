import React from 'react';
import { shallow } from 'enzyme';

import {
  mockEpisode,
  mockEpisodeActions,
} from '../utils/testing/mocks';

import { HistoryContainer } from './HistoryContainer';

const defaultProps = () => {
  return {
    episodes: [
      {
        ...mockEpisode(),
        lastPlayed: true,
      },
    ],
    onSearch: jest.fn(),
    onSelectPage: jest.fn(),
    onClearSearch: jest.fn(),
    dispatch: jest.fn(),
    loading: false,
    authenticated: true,
    ...mockEpisodeActions(),
  };
};

it('should render the container', () => {
  const props = defaultProps();
  const rendered = shallow(<HistoryContainer {...props} />);
  expect(rendered).toBeTruthy();
});
