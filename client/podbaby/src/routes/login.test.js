import React from 'react';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import nock from 'nock';
import { getAuthToken } from '../storage';
import { Provider } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Login } from './login';

jest.mock('../storage');

it('should just render the page', () => {
  const div = document.createElement('div');
  const props = {
    actions: {},
    handleSubmit: jest.fn(),
    submitting: false,
  };
  const Decorated = reduxForm({
    form: 'login',
  })(Login);

  const store = configureMockStore()();
  ReactDOM.render(
    <Provider store={store}>
      <Decorated {...props} />
    </Provider>, div);
});

it('should call submit and log in a valid user', () => {

  const props = {
    actions: {
      getCurrentUser: jest.fn(),
      success: jest.fn(),
    },
    router: {
      push: jest.fn(),
    },
    submitting: false,
    handleSubmit: jest.fn(),
  };

  nock(/localhost:/)
    .post('/api-token-auth/')
    .reply(200, { token: 'abc1234' });

  return new Login(props)
    .handleSubmit({ username: "tester", password: "testpass" })
    .then(() => {
      expect(getAuthToken()).toBe('abc1234');
      expect(props.actions.success).toBeCalled();
      expect(props.actions.getCurrentUser).toBeCalled();
      expect(props.router.push).toBeCalled();
    });


});
