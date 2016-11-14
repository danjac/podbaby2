import { createSelector } from 'reselect';
import { subscriptionsSelector, isSubscribed } from './subscriptions';
import { bookmarksSelector, isBookmarked } from './bookmarks';
import { playerSelector, isPlaying } from './player';
import { historySelector, lastPlayed } from './history';

export const episodeSelector = createSelector(
  state => state.episode.episode,
  playerSelector,
  historySelector,
  subscriptionsSelector,
  bookmarksSelector,
  (episode, player, history, subscriptions, bookmarks) => {
    if (!episode) {
      return null;
    }
    const subscribed = isSubscribed(subscriptions, episode.channel);
    return {
      ...episode,
      subscribed,
      bookmarked: isBookmarked(bookmarks, episode),
      lastPlayed: lastPlayed(history, episode),
      playing: isPlaying(player, episode),
      channel: {
        ...episode.channel,
        subscribed,
      },
    };
  }
);
