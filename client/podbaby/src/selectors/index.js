import { createSelector } from 'reselect';

const resultsSelector = state => state.episodes.results;
const playerSelector = state => state.player;

export const episodesSelector = createSelector(
  resultsSelector,
  playerSelector,
  (episodes, player) => {
    return episodes.map((episode) => {
      const isPlaying = (
        player.isPlaying &&
          player.episode &&
          player.episode.id === episode.id);
      return {
        isPlaying,
        ...episode
      };
    });
  }
);


