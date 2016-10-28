import http from './http-client';

const API_BASE_URL = '/api/categories';

export const all = () => http.get(API_BASE_URL);
