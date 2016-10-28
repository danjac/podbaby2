import { partial } from 'lodash';

import * as api from '../api';

import {
  FETCH_CHANNELS_FAILURE,
  FETCH_CHANNELS_REQUEST,
  FETCH_CHANNELS_SUCCESS,
} from '../action-types';


const fetch = (apiCall, page, searchQuery) => {

  return dispatch => {

    dispatch({
      type: FETCH_CHANNELS_REQUEST
    });

    return apiCall(page, searchQuery)
      .then(payload => {

        dispatch({
          type: FETCH_CHANNELS_SUCCESS,
          payload,
        });

      })
      .catch(error => {

        dispatch({
          type: FETCH_CHANNELS_FAILURE,
          error,
        });

      });
  };
};


export const fetchAllChannels = partial(fetch, api.channels.fetchAll);
export const fetchSubscribedChannels = partial(fetch, api.channels.fetchSubscribed);

export const fetchChannelsByCategory = (id, page, searchQuery) => {
  return fetch(
    () => api.categories.fetchChannels(id),
    page,
    searchQuery
  );
};
