import * as api from '../utils/api';
import {  getAuthToken, removeAuthToken } from '../utils/storage';

import {
  info,
} from './alerts';


const ADD_BOOKMARK = 'podbaby/auth/ADD_BOOKMARK';
const REMOVE_BOOKMARK = 'podbaby/auth/REMOVE_BOOKMARK';

const GET_USER_SUCCESS = 'podbaby/auth/GET_USER_SUCCESS';
const GET_USER_FAILURE = 'podbaby/auth/GET_USER_FAILURE';

const LOGOUT = 'podbaby/auth/LOGOUT';


export function addBookmark(episodeId) {
  // pass in whole episode, fire off alert`
  api.post(`/api/episodes/${episodeId}/create_bookmark/`);
  return {
    type: ADD_BOOKMARK,
    payload: episodeId,
  };
}

export function removeBookmark(episodeId) {
  // pass in whole episode, fire off alert`
  api.del(`/api/episodes/${episodeId}/delete_bookmark/`);
  return {
    type: REMOVE_BOOKMARK,
    payload: episodeId,
  };
}


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
    // tbd: move this out of this function
    dispatch(info('Bye for now!'));
  };
}


const initialState = {
  currentUser: null,
  isLoggedIn: false,
};

export default function(state = initialState, action) {

  const { currentUser } = state;
  const bookmarks = currentUser && currentUser.bookmarks;

  switch (action.type) {
    case ADD_BOOKMARK:
      return {...state,
        currentUser: {
          ...currentUser,
          bookmarks: bookmarks.concat(action.payload),
        }
      };
    case REMOVE_BOOKMARK:
      return {...state,
        currentUser: {
          ...currentUser,
          bookmarks: bookmarks.filter(id => id !== action.payload),
        }
      };
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
