import React from 'react';
import { shallow } from 'enzyme';

import {
  mockChannel,
  mockCategory,
  mockChannelActions,
} from '../../mocks';

import Category from './Category';

const defaultProps = () => {
  return {
    channels: [
      mockChannel(),
    ],
    params: { id: 1 },
    cateogry: mockCategory(),
    dispatch: jest.fn(),
    onSearch: jest.fn(),
    onSelectPage: jest.fn(),
    onClearSearch: jest.fn(),
    categoryLoading: false,
    channelsLoading: false,
    authenticated: false,
    ...mockChannelActions(),
  };
};

it('should render the container', () => {
  const props = defaultProps();
  const rendered = shallow(<Category {...props} />);
  expect(rendered).toBeTruthy();
});
