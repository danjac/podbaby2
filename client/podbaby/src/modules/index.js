import { combineReducers } from 'redux';

import player from './player';
import auth from './auth';
import alerts from './alerts';

export default combineReducers({
  player,
  auth,
  alerts,
});
