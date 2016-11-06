import { bindActionCreators } from 'redux';

import { addBookmark, removeBookmark } from '../actions/bookmarks';
import { startPlayer, stopPlayer } from '../actions/player';
import { subscribe, unsubscribe } from '../actions/subscriptions';

export const bindEpisodeActionCreators = dispatch => bindActionCreators({
  onAddBookmark: addBookmark,
  onRemoveBookmark: removeBookmark,
  onStopPlayer: stopPlayer,
  onStartPlayer: startPlayer,
  onSubscribe: subscribe,
  onUnsubscribe: unsubscribe,
}, dispatch);

export const bindChannelActionCreators = dispatch => bindActionCreators({
  onSubscribe: subscribe,
  onUnsubscribe: unsubscribe,
}, dispatch);
