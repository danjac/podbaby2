import React from 'react';
import { shallow } from 'enzyme';

//import Loader from './Loader';
import CategoryDetail from './CategoryDetail';

import {
  mockChannelActions,
  mockCategory,
  mockChannel,
} from '../test-utils/mocks';

it('should render the component', () => {
  const props = {
    categoryLoading: false,
    channelsLoading: false,
    authenticated: false,
    category: mockCategory(),
    channels: [
      mockChannel(),
    ],
    onSearch: jest.fn(),
    onSelectPage: jest.fn(),
    onClearSearch: jest.fn(),
    ...mockChannelActions(),
  };

  const rendered = shallow(<CategoryDetail {...props} />);
  expect(rendered).toBeTruthy();
});



