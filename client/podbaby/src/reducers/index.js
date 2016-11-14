import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';

import alerts from './alerts';
import auth from './auth';
import bookmarks from './bookmarks';
import category from './category';
import categories from './categories';
import channel from './channel';
import channels from './channels';
import episode from './episode';
import episodes from './episodes';
import history from './history';
import player from './player';
import subscriptions from './subscriptions';

export default combineReducers({
  alerts,
  auth,
  bookmarks,
  category,
  categories,
  channel,
  channels,
  episode,
  episodes,
  history,
  player,
  subscriptions,
  form: formReducer,
});
