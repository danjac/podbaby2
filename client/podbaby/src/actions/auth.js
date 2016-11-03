import * as api from '../api';
import * as storage from '../local-storage';
import { createAction, dispatchApiCall } from '../utils';

import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  NOT_AUTHENTICATED,
  LOGOUT,
} from '../action-types';

export const logout = () => {
  storage.auth.removeToken();
  return createAction(LOGOUT);
};

export const fetchUser = token => {

  if (token) {
    storage.auth.setToken(token);
  } else {
    token = storage.auth.getToken();
  }

  if (!token) {
    return createAction(NOT_AUTHENTICATED);
  }

  return dispatch => dispatchApiCall(
    dispatch,
    api.auth.getUser(),
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
  );

};
