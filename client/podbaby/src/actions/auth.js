import * as api from '../api';

import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  NOT_AUTHENTICATED,
  LOGOUT,
} from '../action-types';

const AUTH_TOKEN = 'auth-token';

export function logout() {
  window.localStorage.removeItem(AUTH_TOKEN);
  return {
    type: LOGOUT
  };
}

export function fetchUser(token) {

  if (token) {
    window.localStorage.setItem(AUTH_TOKEN, token);
  } else {
    token = window.localStorage.getItem(AUTH_TOKEN);
  }

  if (!token) {
    return {
      type: NOT_AUTHENTICATED
    };
  }

  return dispatch => {

    dispatch({
      type: FETCH_USER_REQUEST
    });

    api.auth.getUser()
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
