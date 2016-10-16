import { createSelector } from 'reselect';

import {
  bookmarksSelector,
  subscriptionsSelector,
} from './auth';

const playerSelector = state => state.player;
const resultsSelector = state => state.episodes.results;
const episodeSelector = state => state.episode.episode;

export const playingEpisodeSelector = createSelector(
  playerSelector,
  bookmarksSelector,
  subscriptionsSelector,
  (player, bookmarks, subscriptions) => {
    const { episode, isPlaying } = player;
    if (!isPlaying) {
      return null;
    }
    const isBookmarked = bookmarks.includes(episode.id);
    const isSubscribed = subscriptions.includes(episode.channel.id);
    return {
      ...episode,
      isPlaying: true,
      isBookmarked,
      isSubscribed
    };
  }
);

export const episodeDetailSelector = createSelector(
  episodeSelector,
  playerSelector,
  bookmarksSelector,
  subscriptionsSelector,
  (episode, player, bookmarks, subscriptions) => {

    if (!episode) {
      return null;
    }

    const isBookmarked = bookmarks.includes(episode.id);
    const isSubscribed = subscriptions.includes(episode.channel.id);

    const isPlaying = (
      player.isPlaying &&
        player.episode &&
        player.episode.id === episode.id);

    return { ...episode, isBookmarked, isPlaying, isSubscribed };
  }
);

export const episodesSelector = createSelector(
  resultsSelector,
  playerSelector,
  bookmarksSelector,
  subscriptionsSelector,
  (episodes, player, bookmarks, subscriptions) => {

    return episodes.map(episode => {

      const isBookmarked = bookmarks.includes(episode.id);
      const isSubscribed = subscriptions.includes(episode.channel.id);

      const isPlaying = (
        player.isPlaying &&
          player.episode &&
          player.episode.id === episode.id);

      return { ...episode, isBookmarked, isPlaying, isSubscribed };
    });
  }
);

