import client from './client';

export const getUser = () => client.get('/api/auth/me/');

export const deleteAccount = () => client.del('/api/auth/me/');

export const logout = () => client.del('/api/auth/me/logout/');

export const login = fields => client.post('/api-token-auth/', fields);

export const signup = fields => client.post('/api/auth/create/', fields);

export const changeEmail = email => client.put('/api/auth/update/email/', { email });

export const changePassword = password => client.put('/api/auth/update/pass/', { password });

export const recoverPassword = username => client.post('/api/auth/recoverpass/', { username });
