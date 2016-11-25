import { FETCH_EPISODE_REQUEST } from '../../actionTypes';

export const fetchEpisode = id => ({
  type: FETCH_EPISODE_REQUEST,
  payload: { id },
});
