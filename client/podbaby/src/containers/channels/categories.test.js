import React from 'react';
import { shallow } from 'enzyme';
import { Categories } from './categories';

const defaultProps = {
  categories: [
    {
      id: 1,
      name: 'Comedy',
    }
  ],
  actions: {
    onFetchCategories: jest.fn(),
  },
  isLoading: false,
};

it('should render the component', () => {
  const rendered = shallow(<Categories {...defaultProps} />);
  expect(rendered).toBeTruthy();
});


