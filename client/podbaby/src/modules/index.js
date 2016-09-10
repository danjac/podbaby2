import { combineReducers } from 'redux';

import player from './player';
import auth from './auth';
import login from './login';
import alerts from './alerts';

export default combineReducers({
  player,
  auth,
  login,
  alerts,
});
