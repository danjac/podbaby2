import * as api from '../api';

const LOGIN = 'podbaby/auth/LOGIN';
const LOGIN_SUCCESS = 'podbaby/auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'podbaby/auth/LOGIN_FAILURE';

const LOGOUT = 'podbaby/auth/LOGOUT';


export function getCurrentUser() {
  return dispatch => {
    api.get('/api/auth/')
    .then(payload => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload,
      });
    });
  };
}

export function login(username, password) {
  return dispatch => {
    dispatch({ type: LOGIN });
    api.post('/api-token-auth/', { username, password })
    .then(response => {
      // tbd store token in localStorage
      //return getCurrentUser(token);
      window.localStorage('auth-token', response.token);
      return getCurrentUser();
    })
    .catch(error => {
      dispatch({
        type: 'LOGIN_FAILURE',
        error,
      });
    });
  };
}

export function logout() {
  // tbd remove token from local storage
  return { type: LOGOUT };
}


const initialState = {
  currentUser: null,
  isLoggedIn: false,
};

export default function (state=initialState, action) {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isLoggedIn: true, currentUser: action.payload };
    case LOGIN_FAILURE:
    case LOGOUT:
      return { ...state, isLoggedIn: false, currentUser: null };
    default:
      return state;
  }
}
