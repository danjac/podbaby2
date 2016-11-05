import { createSelector } from 'reselect';

const subscriptionsSelector = state => state.subscriptions;
const bookmarksSelector = state => state.bookmarks;
const playerSelector = state => state.player;

const isPlaying = (player, episode) => (player.playing && player.episode) ? player.episode.id === episode.id : false;

const isBookmarked = (bookmarks, episode) => bookmarks.includes(episode.id);
const isSubscribed = (subscriptions, channel) => subscriptions.includes(channel.id);

export const channelsSelector = createSelector(
  state => state.channels.results,
  subscriptionsSelector,
  (channels, subscriptions) => {
    return channels.map(channel => {
      return {...channel,
        subscribed: isSubscribed(subscriptions, channel),
      };
    });
  },
);

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

export const episodeSelector = createSelector(
  state => state.episode.episode,
  playerSelector,
  subscriptionsSelector,
  bookmarksSelector,
  (episode, player, subscriptions, bookmarks) => {
    if (!episode) {
      return null;
    }
    return {
      ...episode,
      subscribed: isSubscribed(subscriptions, episode.channel),
      bookmarked: isBookmarked(bookmarks, episode),
      playing: isPlaying(player, episode),
    };
  }
);

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
