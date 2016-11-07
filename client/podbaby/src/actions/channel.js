import * as api from '../api';
import { dispatchApiCall } from './utils';

import {
  FETCH_CHANNEL_FAILURE,
  FETCH_CHANNEL_REQUEST,
  FETCH_CHANNEL_SUCCESS,
} from '../actionTypes';

export const fetchChannel = id => dispatch => dispatchApiCall(
  dispatch,
  api.channels.get(id),
  FETCH_CHANNEL_REQUEST,
  FETCH_CHANNEL_SUCCESS,
  FETCH_CHANNEL_FAILURE,
);
