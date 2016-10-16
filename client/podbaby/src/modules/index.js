import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import player from './player';
import categories from './categories';
import episode from './episode';
import episodes from './episodes';
import auth from './auth';
import alerts from './alerts';

export default combineReducers({
  player,
  auth,
  alerts,
  episode,
  episodes,
  categories,
  form: formReducer,
});
