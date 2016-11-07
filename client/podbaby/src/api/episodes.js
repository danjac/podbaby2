import { partial } from 'lodash';

import client from './client';

const API_BASE_URL = '/api/episodes/';

export const get = id => client.get(`${API_BASE_URL}${id}/`);

const fetchMany = (url, page, searchQuery) => {
  const params = {};
  if (page) {
    params.page = page;
  }
  if (searchQuery) {
    params.q = searchQuery;
  }
  return client.get(url, params);
};

export const fetchAll = partial(fetchMany, API_BASE_URL);
export const fetchSubscribed = partial(fetchMany, API_BASE_URL + 'subscribed/');
export const fetchBookmarked = partial(fetchMany, API_BASE_URL + 'bookmarks/');

export const fetchForChannel = (id, page, searchQuery) => fetchMany(
  `/api/channels/${id}/episodes/`,
  page,
  searchQuery,
);
