import React from 'react';
import { shallow, mount } from 'enzyme';

import { mockCategories } from '../../utils/testing/mocks';

import { Categories } from './index';

it('renders the component', () => {
  const props = {
    loading: false,
    dispatch: jest.fn(),
    categories: mockCategories(),
  };
  const rendered = shallow(<Categories {...props} />);
  expect(rendered).toBeTruthy();
});

it('should load categories on mount', () => {
  const props = {
    loading: false,
    dispatch: jest.fn(),
    categories: mockCategories(),
  };
  mount(<Categories {...props} />);
  expect(props.dispatch).toBeCalled();
});
