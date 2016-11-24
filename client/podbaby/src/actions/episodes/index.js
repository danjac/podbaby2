import { partial } from 'lodash';

import * as api from '../../api';

import { FETCH_EPISODES_REQUEST } from '../../actionTypes';

const fetch = (apiCall, page, searchQuery) => ({
  type: FETCH_EPISODES_REQUEST,
  payload: {
    apiCall,
    page,
    searchQuery,
  },
});

export const fetchAllEpisodes = partial(fetch, api.episodes.fetchAll);

export const fetchBookmarkedEpisodes = partial(fetch, api.episodes.fetchBookmarked);

export const fetchSubscribedEpisodes = partial(fetch, api.episodes.fetchSubscribed);

export const fetchPlayedEpisodes = partial(fetch, api.episodes.fetchPlayed);
