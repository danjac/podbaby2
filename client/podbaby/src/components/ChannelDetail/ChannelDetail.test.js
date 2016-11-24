import React from 'react';
import { shallow } from 'enzyme';

import {
  mockEpisodeActions,
  mockChannel,
  mockEpisode,
} from '../../utils/testing/mocks';
//
//import Loader from './Loader';
import ChannelDetail from './ChannelDetail';

it('should render the component', () => {
  const props = {
    channelLoading: false,
    episodesLoading: false,
    authenticated: false,
    channel: mockChannel(),
    episodes: [
      mockEpisode(),
    ],
    onSearch: jest.fn(),
    onSelectPage: jest.fn(),
    onClearSearch: jest.fn(),
    ...mockEpisodeActions(),
  };

  const rendered = shallow(<ChannelDetail {...props} />);
  expect(rendered).toBeTruthy();
});



