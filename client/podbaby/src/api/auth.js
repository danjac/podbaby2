import http from './HTTPClient';

export const getUser = () => http.get('/api/auth/me/');

export const login = fields => http.post('/api-token-auth/', fields);

export const signup = fields => http.post('/api/auth/create/', fields);
