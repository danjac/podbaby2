import React from 'react';
import { shallow, mount } from 'enzyme';

import FormControl from './FormControl';

it('should render the component', () => {
  const props = {
    type: 'text',
    label: 'Name',
    input: {},
    meta: {},
  };
  const rendered = shallow(<FormControl {...props} />);
  expect(rendered).toBeTruthy();
});

it('should display an error', () => {
  const props = {
    type: 'text',
    label: 'Name',
    input: {},
    meta: {
      error: 'Name is missing',
      touched: true,
    },
  };

  const rendered = mount(<FormControl {...props} />);
  expect(rendered.text()).toContain('Name is missing');
});
