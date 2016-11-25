import * as api from '../../api';

import { CLEAR_HISTORY } from '../../actionTypes';

import { createAction } from '../utils';

export const clearHistory = () => {
  api.history.clearHistory();
  return createAction(CLEAR_HISTORY);
};
