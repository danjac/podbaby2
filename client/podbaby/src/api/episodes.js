import { get } from './utils';

const fetch = (url, page, searchQuery) => {
  const params = {};
  if (page) {
    params.page = page;
  }
  if (searchQuery) {
    params.q = searchQuery;
  }
  return get(url, { params });
};

export const getEpisodes = (page, searchQuery) => {
  return fetch('/api/episodes/', page, searchQuery);
};

export const getBookmarks = (page, searchQuery) => {
  return fetch('/api/episodes/bookmarks/', page, searchQuery);
};
