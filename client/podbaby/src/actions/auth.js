import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  NOT_AUTHENTICATED,
  LOGOUT,
} from '../action-types';

import * as api from '../api';
import * as storage from '../local-storage';

import { createAction, dispatchApiCall } from './utils';

import { info, success } from './alerts';

export const logout = () => {
  storage.auth.removeToken();
  return dispatch => {
    dispatch(createAction(LOGOUT));
    dispatch(info('Bye for now!'));
  };
};

export const fetchAuthenticatedUser = token => {

  storage.auth.setToken(token);

  return (dispatch, getState) => dispatchApiCall(
    dispatch,
    api.auth.getUser(),
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
  ).then(() => {
    const { user } = getState().auth;
    dispatch(success(`Welcome back, ${user.username}`));
  });

};

export const fetchUser = () => {

  if (!storage.auth.getToken()) {
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
