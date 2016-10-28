import * as api from '../api';

import {
  FETCH_EPISODE_FAILURE,
  FETCH_EPISODE_REQUEST,
  FETCH_EPISODE_SUCCESS,
} from '../action-types';

export function fetchEpisode(id) {

  return dispatch => {
    dispatch({ type: FETCH_EPISODE_REQUEST });
    return api.episodes.get(id)
    .then(payload => {

      dispatch({
        type: FETCH_EPISODE_SUCCESS,
        payload,
      });

    })
    .catch(error => {

      dispatch({
        type: FETCH_EPISODE_FAILURE,
        error,
      });

    });
  };
}


