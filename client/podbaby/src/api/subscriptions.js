import http from './http-client';

const API_BASE_URL = '/api/channels/';

export const subscribe = id => http.post(`${API_BASE_URL}${id}/subscribe/`);
export const unsubscribe = id => http.del(`${API_BASE_URL}${id}/unsubscribe/`);

