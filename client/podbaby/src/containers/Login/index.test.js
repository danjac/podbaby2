import React from 'react';
import { shallow } from 'enzyme';

import { mockRouter } from '../../utils/testing/mocks';

import { Login } from './index';

jest.mock('../../api');
jest.mock('../../storage');

it('should render the container', () => {
  const props = {
    dispatch: jest.fn(),
    handleSubmit: () => jest.fn(),
    router: mockRouter(),
    submitFailed: false,
    submitting: false,
  };
  const rendered = shallow(<Login {...props} />);
  expect(rendered).toBeTruthy();
});

it('should handle submit', () => {

  //const storage = require('../storage');
  const api = require('../../api');

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

  api.auth.login.mockImplementation(() => {
    return new Promise(resolve => resolve('token'));
  });

  const rendered = shallow(<Login {...props} /> );
  return rendered.instance().handleSubmit(fields)
    .then(() => {
      expect(props.dispatch).toBeCalled();
      expect(props.router.push).toBeCalledWith('/');
    });
});
