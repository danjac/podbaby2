import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import player from './player';
import episodes from './episodes';
import auth from './auth';
import alerts from './alerts';

export default combineReducers({
  player,
  auth,
  alerts,
  episodes,
  form: formReducer,
});
