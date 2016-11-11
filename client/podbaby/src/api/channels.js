import { partial } from 'lodash';

import client from './client';

const API_BASE_URL = '/api/channels/';

export const get = id => client.get(`${API_BASE_URL}${id}/`);

const fetchMany = client.fetchMany.bind(client);

export const fetchAll = partial(fetchMany, API_BASE_URL);
export const fetchSubscribed = partial(fetchMany, API_BASE_URL + '/subscribed/');

export const fetchEpisodes = (id, page, searchQuery) => client.fetchMany(
  `${API_BASE_URL}${id}/episodes/`,
  page,
  searchQuery,
);
