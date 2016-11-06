import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  NOT_AUTHENTICATED,
  CREATE_ALERT,
  LOGOUT,
} from '../actionTypes';

import {
  logout,
  fetchUser,
  fetchAuthenticatedUser,
} from './auth';

jest.mock('../api');
jest.mock('../storage');

const createMockStore = configureMockStore([thunk]);

describe('logout', () => {

  const storage = require('../storage');

  it('Should logout', () => {
    const store = createMockStore();
    store.dispatch(logout());
    expect(store.getActions()[0].type).toBe(LOGOUT);
    expect(storage.auth.removeToken).toBeCalled();
  });
});

describe('fetchAuthenticatedUser', () => {

  const storage = require('../storage');
  const api = require('../api');

  it('should get token and call if available', () => {

    const user = {
        username: 'tester',
    };

    api.auth.getUser.mockImplementation(() => {
      return new Promise(resolve => resolve(user));
    });

    const store = createMockStore({
      auth: {
        user,
      },
    });

    return store.dispatch(fetchAuthenticatedUser())
      .then(() => {
        const actions = store.getActions();
        expect(actions.length).toBe(3);

        expect(actions[0].type).toBe(FETCH_USER_REQUEST);
        expect(actions[1].type).toBe(FETCH_USER_SUCCESS);
        expect(actions[1].payload.username).toBe('tester');
        expect(actions[2].type).toBe(CREATE_ALERT);
        expect(actions[2].payload.message).toBe('Welcome back, tester');

        expect(storage.auth.setToken).toBeCalled();
      });

  });
});

describe('fetchUser', () => {

  const storage = require('../storage');
  const api = require('../api');

  beforeEach(() => {
    api.auth.getUser.mockClear();
    storage.auth.setToken.mockClear();
  });

  it('should return NOT_AUTHENTICATED if no auth token', () => {
    storage.auth.getToken.mockImplementation(() => null);

    const action = fetchUser();
    expect(action.type).toBe(NOT_AUTHENTICATED);

  });

  it('should get token and call if available', () => {
    api.auth.getUser.mockImplementation(() => {
      return new Promise(resolve => {
        resolve({
          username: 'tester',
        });
      });
    });

    storage.auth.getToken.mockImplementation(() => 'token');

    const store = createMockStore();

    return store.dispatch(fetchUser())
      .then(() => {
        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(FETCH_USER_REQUEST);
        expect(actions[1].type).toBe(FETCH_USER_SUCCESS);
        expect(actions[1].payload.username).toBe('tester');
        expect(storage.auth.getToken).toBeCalled();
      });
  });

  it('should return with FETCH_USER_FAILURE on error', () => {
    const error = new Error('No user found');

    api.auth.getUser.mockImplementation(() => {
      return new Promise(() => {
        throw error;
      });
    });

    storage.auth.getToken.mockImplementation(() => 'token');

    const store = createMockStore();

    return store.dispatch(fetchUser())
      .then(() => {
        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(FETCH_USER_REQUEST);
        expect(actions[1].type).toBe(FETCH_USER_FAILURE);
        expect(actions[1].error).toBe(error);
        expect(storage.auth.getToken).toBeCalled();
      });

  });

});
