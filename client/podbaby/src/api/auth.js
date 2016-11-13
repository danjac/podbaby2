import client from './client';

export const getUser = () => client.get('/api/auth/me/');

export const logout = () => client.del('/api/auth/me/logout/');

export const login = fields => client.post('/api-token-auth/', fields);

export const signup = fields => client.post('/api/auth/create/', fields);


