import client from './client';

const API_BASE_URL = '/api/categories/';

export const fetchAll = () => client.get(API_BASE_URL);
