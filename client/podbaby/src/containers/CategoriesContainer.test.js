import React from 'react';
import { shallow, mount } from 'enzyme';

import { mockCategories } from '../mocks';
import { CategoriesContainer } from './CategoriesContainer';

it('renders the component', () => {
  const props = {
    loading: false,
    dispatch: jest.fn(),
    categories: mockCategories(),
  };
  const rendered = shallow(<CategoriesContainer {...props} />);
  expect(rendered).toBeTruthy();
});

it('should load categories on mount', () => {
  const props = {
    loading: false,
    dispatch: jest.fn(),
    categories: mockCategories(),
  };
  mount(<CategoriesContainer {...props} />);
  expect(props.dispatch).toBeCalled();
});
