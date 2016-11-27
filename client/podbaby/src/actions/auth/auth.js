import {
  FETCH_USER_REQUEST,
  NOT_AUTHENTICATED,
  DELETE_ACCOUNT,
  CHANGE_EMAIL,
  LOGOUT,
} from '../../actionTypes';

import * as storage from '../../storage';

export const fetchUserFromStorage = () => {
  if (!storage.auth.getToken()) {
    return { type: NOT_AUTHENTICATED };
  }
  return { type: FETCH_USER_REQUEST };
};

export const fetchAuthenticatedUser = (token, isNew) => {
  storage.auth.setToken(token);
  return { type: FETCH_USER_REQUEST, payload: { isNew } };
};

export const logout = () => {
  storage.auth.removeToken();
  return { type: LOGOUT };
};

export const deleteAccount = () => {
  storage.auth.removeToken();
  return { type: DELETE_ACCOUNT };
};

export const changeEmail = email => {
  return { type: CHANGE_EMAIL, payload: { email } };
};
