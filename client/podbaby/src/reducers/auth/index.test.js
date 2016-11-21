import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  NOT_AUTHENTICATED,
  LOGOUT,
} from '../../actionTypes';

import reducer from './index';

it('should handle FETCH_USER_REQUEST', () => {

  const state = reducer({
    loading: false,
    authenticated: false,
  }, {
    type: FETCH_USER_REQUEST,
  });

  expect(state.loading).toEqual(true);
  expect(state.authenticated).toEqual(true);
});


it('should handle FETCH_USER_FAILURE', () => {

  const error = new Error('User not found');

  const state = reducer({
    loading: true,
    authenticated: false,
    user: null,
    error: null,
  }, {
    type: FETCH_USER_FAILURE,
    error,
  });

  expect(state.loading).toEqual(false);
  expect(state.authenticated).toEqual(false);
  expect(state.user).toEqual(null);
  expect(state.error).toEqual(error);
});

it('should handle FETCH_USER_SUCCESS', () => {

  const state = reducer({
    loading: true,
    authenticated: false,
    user: null,
  }, {
    type: FETCH_USER_SUCCESS,
    payload: {
      name: 'test',
    },
  });

  expect(state.loading).toEqual(false);
  expect(state.authenticated).toEqual(true);
  expect(state.user.name).toEqual('test');
});

it('should handle NOT_AUTHENTICATED', () => {

  const state = reducer({
    user: {
      name: 'test',
    },
    authenticated: true,
  }, {
    type: NOT_AUTHENTICATED,
  });

  expect(state.authenticated).toEqual(false);
  expect(state.user).toEqual(null);

});

it('should handle LOGOUT', () => {

  const state = reducer({
    user: {
      name: 'test',
    },
    authenticated: true,
  }, {
    type: LOGOUT,
  });

  expect(state.authenticated).toEqual(false);
  expect(state.user).toEqual(null);

});
