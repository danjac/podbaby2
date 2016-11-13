import React from 'react';
import { shallow } from 'enzyme';
import * as bs from 'react-bootstrap';

import SignupForm from './SignupForm';

it('should render the component', () => {
  const props = {
    onSubmit: jest.fn(),
    submitFailed: false,
    submitting: false,
  };
  const rendered = shallow(<SignupForm {...props} />);
  expect(rendered).toBeTruthy();
});

it('should show an error message', () => {
  const props = {
    onSubmit: jest.fn(),
    submitFailed: true,
    submitting: false,
  };
  const rendered = shallow(<SignupForm {...props} />);
  expect(rendered.find(bs.Alert).length).toBe(1);
});

it('should submit the form', () => {
  const props = {
    onSubmit: jest.fn(),
    submitFailed: false,
    submitting: false,
  };
  const rendered = shallow(<SignupForm {...props} />);
  rendered.find('form').simulate('submit');
  expect(props.onSubmit).toBeCalled();
});
