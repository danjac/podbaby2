import * as api from '../api';

import {
  info,
} from './alerts';

import {  getAuthToken, removeAuthToken } from '../storage';

const GET_USER_SUCCESS = 'podbaby/auth/GET_USER_SUCCESS';
const GET_USER_FAILURE = 'podbaby/auth/GET_USER_FAILURE';

const LOGOUT = 'podbaby/auth/LOGOUT';


export function getCurrentUser() {
  if (!getAuthToken()) {
    return {
      type: GET_USER_FAILURE
    };
  }
  return dispatch => {
    api.get('/api/auth/me/')
      .then(payload => {
        dispatch({
          type: GET_USER_SUCCESS,
          payload,
        });
      }, () => {
        dispatch({ type: GET_USER_FAILURE });
      });
  };
}

export function logout() {
  removeAuthToken();
  return dispatch => {
    dispatch({
      type: LOGOUT
    });
    dispatch(info('Bye for now!'));
  };
}


const initialState = {
  currentUser: null,
  isLoggedIn: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {...state,
        isLoggedIn: true,
        currentUser: action.payload
      };
    case GET_USER_FAILURE:
    case LOGOUT:
      return {...state,
        isLoggedIn: false,
        currentUser: null
      };
    default:
      return state;
  }
}
