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
      return {...episode,
        subscribed: isSubscribed(subscriptions, episode.channel),
        bookmarked: isBookmarked(bookmarks, episode),
        playing: isPlaying(player, episode),
      };
    });
  },
);
