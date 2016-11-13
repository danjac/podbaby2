import client from './client';

const API_BASE_URL = '/api/categories/';

export const fetchAll = () => client.get(API_BASE_URL);

export const get = id => client.get(`${API_BASE_URL}${id}/`);

export const fetchChannels = (id, page, searchQuery) => client.fetchMany(
  `${API_BASE_URL}${id}/channels/`,
  page,
  searchQuery,
);
