import { bindActionCreators } from 'redux';

import { addBookmark, removeBookmark } from './bookmarks';
import { startPlayer, stopPlayer } from './player';
import { subscribe, unsubscribe } from './subscriptions';

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
