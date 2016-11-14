import * as api from '../api';

import { ADD_PLAY, CLEAR_HISTORY } from '../actionTypes';

import { createAction } from './utils';

export const addPlay = episode => {
  api.history.add(episode.id);
  return createAction(ADD_PLAY, episode.id);
};

export const clearHistory = () => {
  api.history.clearHistory();
  return createAction(CLEAR_HISTORY);
};
