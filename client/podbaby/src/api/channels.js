import { partial } from 'lodash';

import client from './client';

const API_BASE_URL = '/api/channels/';

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
export const fetchSubscribed = partial(fetchMany, API_BASE_URL + '/subscribed');
