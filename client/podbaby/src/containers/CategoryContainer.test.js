import React from 'react';
import { shallow } from 'enzyme';

import {
  mockChannel,
  mockCategory,
  mockChannelActions,
} from '../test-utils/mocks';

import { CategoryContainer } from './CategoryContainer';

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
  const rendered = shallow(<CategoryContainer {...props} />);
  expect(rendered).toBeTruthy();
});
