import { get } from './utils';

export const getEpisode = id => {
  return get(`/api/episodes/${id}/`);
};
