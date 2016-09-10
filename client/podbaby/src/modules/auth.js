import * as api from '../api';

import {
  success,
  info,
  warning
} from './alerts';

const LOGIN = 'podbaby/auth/LOGIN';
const LOGIN_SUCCESS = 'podbaby/auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'podbaby/auth/LOGIN_FAILURE';
const LOGOUT = 'podbaby/auth/LOGOUT';


export function getCurrentUser() {
  if (!window.localStorage.getItem('auth-token')) {
    return {
      type: LOGOUT
    };
  }
  return dispatch => {
    api.get('/api/auth/me/')
      .then(payload => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload,
        });
      });
  };
}

export function login(username, password, router) {
  return dispatch => {
    dispatch({
      type: LOGIN
    });
    api.post('/api-token-auth/', {
        username,
        password
      })
      .then(response => {
        window.localStorage.setItem('auth-token', response.token);
        dispatch(getCurrentUser());
        dispatch(success('Welcome back!'));
        router.push("/");
      }, error => {
        dispatch(warning('Sorry, could not log you in'));
        dispatch({
          type: LOGIN_FAILURE,
          error,
        });
      });
  };
}

export function logout() {
  window.localStorage.removeItem('auth-token');
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
  isLoggingIn: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggingIn: true };
    case LOGIN_SUCCESS:
      return {...state,
        isLoggedIn: true,
        isLoggingIn: false,
        currentUser: action.payload
      };
    case LOGIN_FAILURE:
      return {...state,
        isLoggedIn: false,
        isLoggingIn: false,
        currentUser: null
      };
    case LOGOUT:
      return {...state,
        isLoggedIn: false,
        currentUser: null
      };
    default:
      return state;
  }
}
