import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  NOT_AUTHENTICATED,
  LOGOUT,
} from '../action-types';

import { logout, fetchUser } from './auth';

jest.mock('../api');
jest.mock('../local-storage');

const createMockStore = configureMockStore([thunk]);

describe('logout', () => {

  const storage = require('../local-storage');

  it('Should logout', () => {
    const action = logout();
    expect(action.type).toBe(LOGOUT);
    expect(storage.auth.removeToken).toBeCalled();
  });
});

describe('fetchUser', () => {

  const storage = require('../local-storage');
  const api = require('../api');

  beforeEach(() => {
    api.auth.getUser.mockClear();
    storage.auth.getToken.mockClear();
    storage.auth.setToken.mockClear();
  });

  it('should return NOT_AUTHENTICATED if no auth token', () => {
    storage.auth.getToken.mockImplementation(() => null);

    const action = fetchUser();
    expect(action.type).toBe(NOT_AUTHENTICATED);

  });

  it('should store token and fetch user if token provided as arg', () => {
    api.auth.getUser.mockImplementation(() => {
      return new Promise(resolve => {
        resolve({
          name: 'tester',
        });
      });
    });

    const store = createMockStore();

    return store.dispatch(fetchUser('token'))
      .then(() => {
        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(FETCH_USER_REQUEST);
        expect(actions[1].type).toBe(FETCH_USER_SUCCESS);
        expect(actions[1].payload.name).toBe('tester');
        expect(storage.auth.setToken).toBeCalledWith('token');
      });
  });

  it('should get token and call if available', () => {
    api.auth.getUser.mockImplementation(() => {
      return new Promise(resolve => {
        resolve({
          name: 'tester',
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
        expect(actions[1].payload.name).toBe('tester');
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
