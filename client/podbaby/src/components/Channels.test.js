import React from 'react';
import { shallow } from 'enzyme';

import { mockChannel, mockChannelActions} from '../test-utils/mocks';

import Channels from './Channels';

it('should render the component', () => {
  const props = {
    channels: [
      mockChannel(),
    ],
    searchQuery: '',
    loading: false,
    header: 'Feeds',
    onSearch: jest.fn(),
    onClearSearch: jest.fn(),
    onSelectPage: jest.fn(),
    ...mockChannelActions(),
  };

  const rendered = shallow(<Channels {...props} />);
  expect(rendered).toBeTruthy();
});
