import React from 'react';
import { shallow, mount } from 'enzyme';

import FormControl from './FormControl';

it('should render the component', () => {
  const field = {
    type: 'text',
    label: 'Name',
    meta: {},
  };
  const rendered = shallow(<FormControl field={field} />);
  expect(rendered).toBeTruthy();
});

it('should display an error', () => {
  const field = {
    type: 'text',
    label: 'Name',
    meta: {
      error: 'Name is missing',
      touched: true,
    },
  };

  const rendered = mount(<FormControl field={field} />);
  expect(rendered.text()).toContain('Name is missing');
});
