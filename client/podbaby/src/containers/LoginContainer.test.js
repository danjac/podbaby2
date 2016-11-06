import React from 'react';
import { shallow } from 'enzyme';

import { LoginContainer } from './LoginContainer';

jest.mock('../api');
jest.mock('../local-storage');

it('should render the container', () => {
  const props = {
    dispatch: jest.fn(),
    handleSubmit: () => jest.fn(),
    router: {},
    submitFailed: false,
    submitting: false,
  };
  const rendered = shallow(<LoginContainer {...props} />);
  expect(rendered).toBeTruthy();
});

it('should handle submit', () => {

  //const storage = require('../local-storage');
  const api = require('../api');

  const props = {
    dispatch: jest.fn(),
    handleSubmit: () => jest.fn(),
    router: {
      push: jest.fn(),
    },
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

  const rendered = shallow(<LoginContainer {...props} /> );
  return rendered.instance().handleSubmit(fields)
    .then(() => {
      expect(props.dispatch).toBeCalled();
      expect(props.router.push).toBeCalledWith('/');
    });
});
