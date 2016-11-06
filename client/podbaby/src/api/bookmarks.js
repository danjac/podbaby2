import http from './client';

const API_BASE_URL = '/api/episodes/';

export const add = id => http.post(`${API_BASE_URL}${id}/add_bookmark/`);
export const remove = id => http.del(`${API_BASE_URL}${id}/remove_bookmark/`);

