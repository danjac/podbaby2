import React from 'react';
import { shallow } from 'enzyme';

import { mockCategories } from '../test-utils/mocks';
import Loader from './Loader';
import Categories from './Categories';

it('renders the component', () => {
  const props = {
    loading: false,
    categories: mockCategories(),
  };
  const rendered = shallow(<Categories {...props} />);
  expect(rendered).toBeTruthy();
});

it('should show loader if loading', () => {
  const props = {
    loading: true,
    categories: [],
  };
  const rendered = shallow(<Categories {...props} />);
  expect(rendered.find(Loader)).toBeTruthy();
});
