import React from 'react';
import { shallow } from 'enzyme';

import { mockCategories } from '../../mocks';
import Loader from '../Loader';

import CategoriesPage from './index';

it('renders the component', () => {
  const props = {
    loading: false,
    categories: mockCategories(),
  };
  const rendered = shallow(<CategoriesPage {...props} />);
  expect(rendered).toBeTruthy();
});

it('should show loader if loading', () => {
  const props = {
    loading: true,
    categories: [],
  };
  const rendered = shallow(<CategoriesPage {...props} />);
  expect(rendered.find(Loader)).toBeTruthy();
});
