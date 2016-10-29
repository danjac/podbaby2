import * as api from '../api';
import * as storage from '../local-storage';

import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  NOT_AUTHENTICATED,
  LOGOUT,
} from '../action-types';

export function logout() {
  storage.auth.removeToken();
  return {
    type: LOGOUT,
  };
}

export function fetchUser(token) {

  if (token) {
    storage.auth.setToken(token);
  } else {
    token = storage.auth.getToken();
  }

  if (!token) {
    return {
      type: NOT_AUTHENTICATED,
    };
  }

  return dispatch => {

    dispatch({
      type: FETCH_USER_REQUEST,
    });

    return api.auth.getUser()
      .then(payload => {

        dispatch({
          type: FETCH_USER_SUCCESS,
          payload,
        });

      })
      .catch(error => {

        dispatch({
          type: FETCH_USER_FAILURE,
          error,
        });

      });
  };
}
