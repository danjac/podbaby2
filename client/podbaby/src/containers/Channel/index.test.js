import React from 'react';
import { shallow } from 'enzyme';

import {
  mockChannel,
  mockEpisode,
  mockEpisodeActions,
} from '../../mocks';

import { Channel } from './index';

const defaultProps = () => {
  return {
    episodes: [
      mockEpisode(),
    ],
    params: { id: 1 },
    channel: mockChannel(),
    dispatch: jest.fn(),
    onSearch: jest.fn(),
    onSelectPage: jest.fn(),
    onClearSearch: jest.fn(),
    channelLoading: false,
    episodesLoading: false,
    authenticated: false,
    ...mockEpisodeActions(),
  };
};

it('should render the container', () => {
  const props = defaultProps();
  const rendered = shallow(<Channel {...props} />);
  expect(rendered).toBeTruthy();
});
