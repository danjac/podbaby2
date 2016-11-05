import { bindActionsCreators } from 'redux';

import { addBookmark, removeBookmark } from '../actions/bookmarks';
import { startPlayer, stopPlayer } from '../actions/player';
import { subscribe, unsubscribe } from '../actions/subscriptions';

export const bindEpisodeActions = dispatch => bindActionsCreators({
  onAddBookmark: addBookmark,
  onRemoveBookmark: removeBookmark,
  onStopPlayer: stopPlayer,
  onStartPlayer: startPlayer,
  onSubscribe: subscribe,
  onUnsubscribe: unsubscribe,
}, dispatch);

export const bindChannelActions = dispatch => bindActionsCreators({
  onSubscribe: subscribe,
  onUnsubscribe: unsubscribe,
}, dispatch);
