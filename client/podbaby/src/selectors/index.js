import { createSelector } from 'reselect';

const currentUserSelector = state => state.auth.currentUser;
const resultsSelector = state => state.episodes.results;
const playerSelector = state => state.player;

export const episodesSelector = createSelector(
  resultsSelector,
  playerSelector,
  currentUserSelector,
  (episodes, player, currentUser) => {

    return episodes.map((episode) => {

      const isBookmarked = (
        currentUser && currentUser.bookmarks.includes(episode.id)
      );

      const isPlaying = (
        player.isPlaying &&
          player.episode &&
          player.episode.id === episode.id);

      return { isBookmarked, isPlaying, ...episode };
    });
  }
);


