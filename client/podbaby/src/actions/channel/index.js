import {
  FETCH_CHANNEL_EPISODES_REQUEST,
  FETCH_CHANNEL_REQUEST,
} from '../../actionTypes';

export const fetchChannel = id => ({
  type: FETCH_CHANNEL_REQUEST,
  payload: { id },
});


export const fetchEpisodesForChannel = (id, page, searchQuery) =>({
  type: FETCH_CHANNEL_EPISODES_REQUEST,
  payload: {
    id,
    page,
    searchQuery,
  },
});
