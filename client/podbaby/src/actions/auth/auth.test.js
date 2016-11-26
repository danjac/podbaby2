import {
  FETCH_USER_REQUEST,
  NOT_AUTHENTICATED,
  LOGOUT,
} from '../../actionTypes';

import {
  logout,
  fetchUserFromStorage,
  fetchAuthenticatedUser,
} from './auth';

jest.mock('../../storage');

describe('logout', () => {

  const storage = require('../../storage');

  it('Should logout', () => {
    const action = logout();
    expect(action.type).toEqual(LOGOUT);
    expect(storage.auth.removeToken).toBeCalled();
  });
});

describe('fetchAuthenticatedUser', () => {

  const storage = require('../../storage');

  it('should get token and call if available', () => {

    const action = fetchAuthenticatedUser();
    expect(action.type).toEqual(FETCH_USER_REQUEST);
    expect(storage.auth.setToken).toBeCalled();
  });
});

describe('fetchUserFromStorage', () => {

  const storage = require('../../storage');

  beforeEach(() => {
    storage.auth.setToken.mockClear();
  });

  it('should return NOT_AUTHENTICATED if no auth token', () => {
    storage.auth.getToken.mockImplementation(() => null);

    const action = fetchUserFromStorage();
    expect(action.type).toBe(NOT_AUTHENTICATED);

  });

  it('should get token and call if available', () => {
    storage.auth.getToken.mockImplementation(() => 'token');

    const action = fetchUserFromStorage();
    expect(action.type).toBe(FETCH_USER_REQUEST);

  });

});
