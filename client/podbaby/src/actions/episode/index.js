import * as api from '../../api';
import { dispatchApiCall } from '../utils';

import {
  FETCH_EPISODE_FAILURE,
  FETCH_EPISODE_REQUEST,
  FETCH_EPISODE_SUCCESS,
} from '../../actionTypes';

export const fetchEpisode = id => dispatch => dispatchApiCall(
  dispatch,
  api.episodes.get(id),
  FETCH_EPISODE_REQUEST,
  FETCH_EPISODE_SUCCESS,
  FETCH_EPISODE_FAILURE,
);
