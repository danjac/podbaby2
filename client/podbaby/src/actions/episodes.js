import { partial } from 'lodash';

import * as api from '../api';
import { dispatchApiCall } from '../utils';

import {
  FETCH_EPISODES_FAILURE,
  FETCH_EPISODES_REQUEST,
  FETCH_EPISODES_SUCCESS,
} from '../action-types';


const fetch = (apiCall, page, searchQuery) => dispatch => dispatchApiCall(
  dispatch,
  apiCall(page, searchQuery),
  FETCH_EPISODES_REQUEST,
  FETCH_EPISODES_SUCCESS,
  FETCH_EPISODES_FAILURE,
);


export const fetchAllEpisodes = partial(fetch, api.episodes.fetchAll);
export const fetchBookmarkedEpisodes = partial(fetch, api.episodes.fetchBookmarked);
export const fetchSubscribedEpisodes = partial(fetch, api.episodes.fetchSubscribed);
