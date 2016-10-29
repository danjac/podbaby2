import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// import alerts from './alerts';
import auth from './auth';
import bookmarks from './bookmarks';
// import categories from './categories';
import channels from './channels';
import episode from './episode';
import episodes from './episodes';
import player from './player';
// import subscriptions from './subscriptions';

export default combineReducers({
  // alerts,
  auth,
  bookmarks,
  // categories,
  channels,
  episode,
  episodes,
  player,
  // subscriptions,
  form: formReducer,
});
