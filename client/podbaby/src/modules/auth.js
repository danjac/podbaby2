import * as api from '../utils/api';
import {
  getAuthToken,
  removeAuthToken
} from '../utils/storage';

import { info } from './alerts';


export const ADD_BOOKMARK = 'podbaby/auth/ADD_BOOKMARK';
export const REMOVE_BOOKMARK = 'podbaby/auth/REMOVE_BOOKMARK';

export const SUBSCRIBE = 'podbaby/auth/SUBSCRIBE';
export const UNSUBSCRIBE = 'podbaby/auth/UNSUBSCRIBE';

// we check if user has auth token
export const USER_LOGGED_IN = 'podbaby/auth/USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'podbaby/auth/USER_LOGGED_OUT';

// retrieving user details from server
export const GET_USER_SUCCESS = 'podbaby/auth/GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'podbaby/auth/GET_USER_FAILURE';


export function subscribe(channel) {
  api.post(`/api/channels/${channel.id}/subscribe/`);
  return dispatch => {
    dispatch(info('You have subscribed to this feed'));
    dispatch({
      type: SUBSCRIBE,
      payload: channel.id,
    });
  };
}

export function unsubscribe(channel) {
  api.del(`/api/channels/${channel.id}/unsubscribe/`);
  return dispatch => {
    dispatch(info('You have unsubscribed from this feed'));
    dispatch({
      type: UNSUBSCRIBE,
      payload: channel.id,
    });
  };
}

export function addBookmark(episode) {
  api.post(`/api/episodes/${episode.id}/create_bookmark/`);
  return dispatch => {
    dispatch(info('You have added this podcast to your playlist.'));
    dispatch({
      type: ADD_BOOKMARK,
      payload: episode.id,
    });
  };
}

export function removeBookmark(episode) {
  api.del(`/api/episodes/${episode.id}/delete_bookmark/`);
  return dispatch => {
    dispatch(info('You have removed this podcast from your playlist.'));
    dispatch({
      type: REMOVE_BOOKMARK,
      payload: episode.id,
    });
  };
}


export function getCurrentUser() {
  if (!getAuthToken()) {
    return {
      type: USER_LOGGED_OUT,
    };
  }
  return dispatch => {
    dispatch({
      type: USER_LOGGED_IN,
    });
    return api.get('/api/auth/me/')
      .then(payload => {
        dispatch({
          type: GET_USER_SUCCESS,
          payload,
        });
      }, () => {
        dispatch({
          type: GET_USER_FAILURE
        });
      });
  };
}

export function logout() {
  removeAuthToken();
  return dispatch => {
    dispatch({
      type: USER_LOGGED_OUT,
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
  const subscriptions = currentUser && currentUser.subscriptions;

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

    case SUBSCRIBE:
      return {
        ...state,
        currentUser: {
          ...currentUser,
          subscriptions: subscriptions.concat(action.payload),
        }
      };

    case UNSUBSCRIBE:
      return {...state,
        currentUser: {
          ...currentUser,
          subscriptions: subscriptions.filter(id => id !== action.payload),
        }
      };

    case USER_LOGGED_IN:
      return {...state, isLoggedIn: true};

    case GET_USER_SUCCESS:
      return {...state,
        isLoggedIn: true,
        currentUser: action.payload
      };

    case GET_USER_FAILURE:
    case USER_LOGGED_OUT:
      return {...initialState};

    default:
      return state;
  }
}
