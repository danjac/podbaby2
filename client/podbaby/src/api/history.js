import client from './client';

export const add = id => client.post(`/api/episodes/${id}/add_play/`);

export const clearHistory = () => client.del('/api/auth/me/clear_history/');
