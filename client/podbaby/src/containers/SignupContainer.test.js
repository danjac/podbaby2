import React from 'react';
import { shallow } from 'enzyme';

import { mockRouter } from '../test-utils/mocks';

import { SignupContainer } from './SignupContainer';

jest.mock('../api');
jest.mock('../storage');

it('should render the container', () => {
  const props = {
    dispatch: jest.fn(),
    handleSubmit: () => jest.fn(),
    router: mockRouter(),
    submitFailed: false,
    submitting: false,
  };
  const rendered = shallow(<SignupContainer {...props} />);
  expect(rendered).toBeTruthy();
});

it('should handle submit', () => {

  //const storage = require('../storage');
  const api = require('../api');

  const props = {
    dispatch: jest.fn(),
    handleSubmit: () => jest.fn(),
    router: mockRouter(),
    submitFailed: false,
    submitting: false,
  };

  const fields = {
    username: 'tester',
    password: 'testpass',
  };

  api.auth.signup.mockImplementation(() => {
    return new Promise(resolve => resolve('token'));
  });

  const rendered = shallow(<SignupContainer {...props} /> );
  return rendered.instance().handleSubmit(fields)
    .then(() => {
      expect(props.dispatch).toBeCalled();
      expect(props.router.push).toBeCalledWith('/');
    });
});