import client from './client';

const API_BASE_URL = '/api/episodes/';

export const add = id => client.post(`${API_BASE_URL}${id}/add_bookmark/`);
export const remove = id => client.del(`${API_BASE_URL}${id}/remove_bookmark/`);

