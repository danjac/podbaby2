import React from 'react';
import { shallow } from 'enzyme';

import { mockChannel, mockChannelActions} from '../../mocks';

import ChannelsPage from './index';

it('should render the component', () => {
  const props = {
    channels: [
      mockChannel(),
    ],
    searchQuery: '',
    loading: false,
    title: 'Feeds',
    onSearch: jest.fn(),
    onClearSearch: jest.fn(),
    onSelectPage: jest.fn(),
    ...mockChannelActions(),
  };

  const rendered = shallow(<ChannelsPage {...props} />);
  expect(rendered).toBeTruthy();
});
