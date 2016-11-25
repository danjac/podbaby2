import {
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_CHANNELS_REQUEST,
} from '../../actionTypes';

export const fetchCategory = id => ({
  type: FETCH_CATEGORY_REQUEST,
  payload: { id },
});

export const fetchChannelsForCategory = (id, page, searchQuery) => ({
  type: FETCH_CATEGORY_CHANNELS_REQUEST,
  payload: {
    id,
    page,
    searchQuery,
  },
});
