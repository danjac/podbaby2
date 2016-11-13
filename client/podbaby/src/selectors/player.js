import { createSelector } from 'reselect';
import { subscriptionsSelector, isSubscribed } from './subscriptions';
import { bookmarksSelector, isBookmarked } from './bookmarks';

export const playerSelector = state => state.player;
export const isPlaying = (player, episode) => (player.playing && player.episode) ? player.episode.id === episode.id : false;

export const lastPlayed = (player, episode) => {
  return player.plays
    .filter(play => episode.id === play.episode)
    .map(play => play.created)[0];
};

export const playingEpisodeSelector = createSelector(
  playerSelector,
  subscriptionsSelector,
  bookmarksSelector,
  (player, subscriptions, bookmarks) => {
    const { episode } = player;
    if (!episode) {
      return null;
    }
    return {
      ...episode,
      playing: true,
      subscribed: isSubscribed(subscriptions, episode.channel),
      bookmarked: isBookmarked(bookmarks, episode),
    };
  }
);
