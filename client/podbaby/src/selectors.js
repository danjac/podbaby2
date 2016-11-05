import {
  createSelector,
} from 'reselect';

const subscriptionsSelector = state => state.subscriptions;
const bookmarksSelector = state => state.bookmarks;
const playerSelector = state => state.player;

export const channelsSelector = createSelector(
  state => state.channels.results,
  subscriptionsSelector,
  (channels, subscriptions) => {
    return channels.map(channel => {
      return {...channel,
        subscribed: subscriptions.includes(channel.id),
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
      subscribed: subscriptions.includes(episode.channel.id),
      bookmarked: bookmarks.includes(episode.id),
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
        subscribed: subscriptions.includes(episode.channel.id),
        bookmarked: bookmarks.includes(episode.id),
        playing: player.playing && player.episode && player.episode.id === episode.id,
      };
    });
  },
);
