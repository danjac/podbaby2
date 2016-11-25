import { partial } from 'lodash';

import {
  FETCH_ALL_EPISODES_REQUEST,
  FETCH_SUBSCRIBED_EPISODES_REQUEST,
  FETCH_BOOKMARKED_EPISODES_REQUEST,
  FETCH_PLAYED_EPISODES_REQUEST,
} from '../../actionTypes';

const fetch = (type, page, searchQuery) => ({
  type: type,
  payload: {
    page,
    searchQuery,
  },
});

export const fetchAllEpisodes = partial(fetch, FETCH_ALL_EPISODES_REQUEST);

export const fetchBookmarkedEpisodes = partial(fetch, FETCH_BOOKMARKED_EPISODES_REQUEST);

export const fetchSubscribedEpisodes = partial(fetch, FETCH_SUBSCRIBED_EPISODES_REQUEST);

export const fetchPlayedEpisodes = partial(fetch, FETCH_PLAYED_EPISODES_REQUEST);
