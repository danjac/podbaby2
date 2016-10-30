import {
  partial,
} from 'lodash';

import * as api from '../api';

import {
  FETCH_EPISODES_FAILURE,
  FETCH_EPISODES_REQUEST,
  FETCH_EPISODES_SUCCESS,
} from '../action-types';


const fetch = (apiCall, page, searchQuery) => {

  return dispatch => {

    dispatch({
      type: FETCH_EPISODES_REQUEST,
    });

    return apiCall(page, searchQuery)
      .then(payload => {

        dispatch({
          type: FETCH_EPISODES_SUCCESS,
          payload,
        });

      })
      .catch(error => {

        dispatch({
          type: FETCH_EPISODES_FAILURE,
          error,
        });

      });
  };
};


export const fetchAllEpisodes = partial(fetch, api.episodes.fetchAll);
export const fetchBookmarkedEpisodes = partial(fetch, api.episodes.fetchBookmarked);
export const fetchSubscribedEpisodes = partial(fetch, api.episodes.fetchSubscribed);
