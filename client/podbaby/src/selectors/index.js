import { createSelector } from 'reselect';

const currentUserSelector = state => state.auth.currentUser;
const resultsSelector = state => state.episodes.results;
const playerSelector = state => state.player;

export const bookmarksSelector = createSelector(
  currentUserSelector,
  currentUser => {
    return currentUser && currentUser.bookmarks;
  }
);

export const subscriptionsSelector = createSelector(
  currentUserSelector,
  currentUser => {
    return currentUser && currentUser.subscriptions;
  }
);

export const episodesSelector = createSelector(
  resultsSelector,
  playerSelector,
  bookmarksSelector,
  subscriptionsSelector,
  (episodes, player, bookmarks, subscriptions) => {

    return episodes.map((episode) => {

      const isBookmarked = bookmarks.includes(episode.id);
      const isSubscribed = subscriptions.includes(episode.channel.id);

      const isPlaying = (
        player.isPlaying &&
          player.episode &&
          player.episode.id === episode.id);

      return { isBookmarked, isPlaying, isSubscribed, ...episode };
    });
  }
);


