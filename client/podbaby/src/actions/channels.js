import { partial } from 'lodash';

import * as api from '../api';
import { dispatchApiCall } from './utils';

import {
  FETCH_CHANNELS_FAILURE,
  FETCH_CHANNELS_REQUEST,
  FETCH_CHANNELS_SUCCESS,
} from '../actionTypes';


const fetch = (apiCall, page, searchQuery) => dispatch => dispatchApiCall(
  dispatch,
  apiCall(page, searchQuery),
  FETCH_CHANNELS_REQUEST,
  FETCH_CHANNELS_SUCCESS,
  FETCH_CHANNELS_FAILURE,
);

export const fetchAllChannels = partial(fetch, api.channels.fetchAll);
export const fetchSubscribedChannels = partial(fetch, api.channels.fetchSubscribed);
