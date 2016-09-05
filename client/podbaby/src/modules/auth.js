import * as api from '../api';

const LOGIN = 'podbaby/auth/LOGIN';
const LOGIN_SUCCESS = 'podbaby/auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'podbaby/auth/LOGIN_FAILURE';

const LOGOUT = 'podbaby/auth/LOGOUT';


export function getCurrentUser() {
  if (!window.localStorage.getItem('auth-token')) {
    return { type: LOGOUT };
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
    dispatch({ type: LOGIN });
    api.post('/api-token-auth/', { username, password })
    .then(response => {
      window.localStorage.setItem('auth-token', response.token);
      dispatch(getCurrentUser());
      router.push("/");
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
