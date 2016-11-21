import * as api from '../../api';
import { dispatchApiCall } from '../utils';

import {
  FETCH_CATEGORY_FAILURE,
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CHANNELS_FAILURE,
  FETCH_CHANNELS_REQUEST,
  FETCH_CHANNELS_SUCCESS,
} from '../../actionTypes';

export const fetchCategory = id => dispatch => dispatchApiCall(
  dispatch,
  api.categories.get(id),
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_FAILURE,
);


export const fetchChannelsForCategory = (id, page, searchQuery) => dispatch => dispatchApiCall(
  dispatch,
  api.categories.fetchChannels(id, page, searchQuery),
  FETCH_CHANNELS_REQUEST,
  FETCH_CHANNELS_SUCCESS,
  FETCH_CHANNELS_FAILURE,
);
