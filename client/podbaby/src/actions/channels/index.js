import { partial } from 'lodash';

import {
  FETCH_ALL_CHANNELS_REQUEST,
  FETCH_SUBSCRIBED_CHANNELS_REQUEST,
} from '../../actionTypes';


const fetch = (type, page, searchQuery) => ({
  type,
  payload: {
    page,
    searchQuery,
  },
});

export const fetchAllChannels = partial(fetch, FETCH_ALL_CHANNELS_REQUEST);
export const fetchSubscribedChannels = partial(fetch, FETCH_SUBSCRIBED_CHANNELS_REQUEST);
