import {
  getEpisodes,
  getBookmarks,
  getSubscribed,
} from '../api/episodes';

import { pageNumberFromUrl } from '../utils/pagination';

export const FETCH_EPISODES = 'podbaby/episodes/FETCH_EPISODES';
export const FETCH_EPISODES_SUCCESS = 'podbaby/episodes/FETCH_EPISODES_SUCCESS';
export const FETCH_EPISODES_FAILURE = 'podbaby/episodes/FETCH_EPISODES_FAILURE';

const initialState = {
  isLoading: false,
  results: [],
  next: null,
  previous: null,
};

const fetch = (apiCall, page, searchQuery) => {
  return dispatch => {
    dispatch({ type: FETCH_EPISODES });
    return apiCall(page, searchQuery)
    .then(payload => {
      dispatch({
        type: FETCH_EPISODES_SUCCESS,
        payload,
      });
    }, error => {
      dispatch({
        type: FETCH_EPISODES_FAILURE,
        error,
      });
    });
  };
};

export function fetchEpisodes(page, searchQuery) {
  return fetch(getEpisodes, page, searchQuery);
}

export function fetchBookmarks(page, searchQuery) {
  return fetch(getBookmarks, page, searchQuery);
}

export function fetchSubscribed(page, searchQuery) {
  return fetch(getSubscribed, page, searchQuery);
}

export default function (state=initialState, action) {
  switch (action.type) {
    case FETCH_EPISODES:
      return { ...state, isLoading: true };
    case FETCH_EPISODES_FAILURE:
      return initialState;
    case FETCH_EPISODES_SUCCESS:

      const { previous, next } = action.payload;

      return {
        ...state,
        ...action.payload,
        isLoading: false,
        previous: pageNumberFromUrl(previous),
        next: pageNumberFromUrl(next),
      };

    default:
      return state;
  }
}
