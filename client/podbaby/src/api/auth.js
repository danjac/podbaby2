import http from './http-client';

export const getUser = () => http.get('/api/auth/me');

export const login = (username, password) => http.post('/api-token-auth/', {
  username,
  password,
});

export const signup = (username, email, password) => http.post('/api/auth/create/', {
  username,
  email,
  password,
});
