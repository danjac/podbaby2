import { createSelector } from 'reselect';
import { subscriptionsSelector, isSubscribed } from './subscriptions';
import { bookmarksSelector, isBookmarked } from './bookmarks';
import { playerSelector, isPlaying } from './player';

export const episodeSelector = createSelector(
  state => state.episode.episode,
  playerSelector,
  subscriptionsSelector,
  bookmarksSelector,
  (episode, player, subscriptions, bookmarks) => {
    if (!episode) {
      return null;
    }
    const subscribed = isSubscribed(subscriptions, episode.channel);
    return {
      ...episode,
      subscribed,
      bookmarked: isBookmarked(bookmarks, episode),
      playing: isPlaying(player, episode),
      channel: {
        ...episode.channel,
        subscribed,
      },
    };
  }
);
