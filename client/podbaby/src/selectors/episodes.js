import { createSelector } from 'reselect';
import { subscriptionsSelector, isSubscribed } from './subscriptions';
import { bookmarksSelector, isBookmarked } from './bookmarks';
import { playerSelector, isPlaying } from './player';

export const episodesSelector = createSelector(
  state => state.episodes.results,
  playerSelector,
  subscriptionsSelector,
  bookmarksSelector,
  (episodes, player, subscriptions, bookmarks) => {
    return episodes.map(episode => {
      const subscribed = isSubscribed(subscriptions, episode.channel);
      return {...episode,
        subscribed,
        bookmarked: isBookmarked(bookmarks, episode),
        playing: isPlaying(player, episode),
        channel: {
          ...episode.channel,
          subscribed,
        },
      };
    });
  },
);
