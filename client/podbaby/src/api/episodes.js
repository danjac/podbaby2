import {
  partial,
} from 'lodash';

import http from './client';

const API_BASE_URL = '/api/episodes/';

export const get = id => http.get(`${API_BASE_URL}${id}/`);

const fetchMany = (url, page, searchQuery) => {
  const params = {};
  if (page) {
    params.page = page;
  }
  if (searchQuery) {
    params.q = searchQuery;
  }
  return http.get(url, params);
};

export const fetchAll = partial(fetchMany, API_BASE_URL);
export const fetchSubscribed = partial(fetchMany, API_BASE_URL + 'subscribed/');
export const fetchBookmarked = partial(fetchMany, API_BASE_URL + 'bookmarked/');
