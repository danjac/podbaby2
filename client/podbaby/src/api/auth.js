import { get, post, del } from './utils';

export const getCurrentUser = () => get('/api/auth/me/');

export const subscribe = id => post(`/api/channels/${id}/subscribe/`);
export const unsubscribe = id => del(`/api/channels/${id}/unsubscribe/`);

export const addBookmark = id => post(`/api/episodes/${id}/create_bookmark/`);
export const deleteBookmark = id => del(`/api/episodes/${id}/delete_bookmark/`);

export const login = (username, password) => {
  return post('/api-token-auth/', {
    username,
    password,
  });
};
