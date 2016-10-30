import http from './http-client';

const API_BASE_URL = '/api/categories';

export const fetchAll = () => http.get(API_BASE_URL);
