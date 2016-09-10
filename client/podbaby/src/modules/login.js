import * as api from '../api';

import {
  success,
  warning,
} from './alerts';

import { getCurrentUser } from './auth';

import {  setAuthToken } from '../storage';


const LOGIN = 'podbaby/login/LOGIN';
const LOGIN_SUCCESS = 'podbaby/login/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'podbaby/login/LOGIN_FAILURE';


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
        setAuthToken(response.token);
        dispatch({ type: LOGIN_SUCCESS });
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

const initialState = {
  isLoggingIn: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {...state,
        isLoggingIn: true
      };
    case LOGIN_FAILURE:
    case LOGIN_SUCCESS:
      return {...state,
        isLoggingIn: false,
      };
    default:
      return state;
  }
}
