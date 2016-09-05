import { combineReducers } from 'redux';

import player from './player';
import auth from './auth';

export default combineReducers({
  player,
  auth,
});
