import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  NOT_AUTHENTICATED,
  LOGOUT,
} from '../../actionTypes';

import * as api from '../../api';
import * as storage from '../../storage';

import { createAction, dispatchApiCall } from '../utils';

import { info, success } from '../alerts';

const fetch = dispatch => dispatchApiCall(
  dispatch,
  api.auth.getUser(),
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
);

export const fetchAuthenticatedUser = (token, isNew) => {

  storage.auth.setToken(token);

  return (dispatch, getState) => fetch(dispatch)
    .then(() => {
      const { user } = getState().auth;
      const msg = isNew ? `Welcome, ${user.username}` : `Welcome back, ${user.username}`;
      dispatch(success(msg));
    });

};

export const fetchUser = () => {
  if (!storage.auth.getToken()) {
    return createAction(NOT_AUTHENTICATED);
  }
  return dispatch => fetch(dispatch);
};

export const logout = () => {
  api.auth.logout();
  storage.auth.removeToken();
  return dispatch => {
    dispatch(createAction(LOGOUT));
    dispatch(info('Bye for now!'));
  };
};
