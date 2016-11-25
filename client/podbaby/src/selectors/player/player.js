import { createSelector } from 'reselect';

import { channelSelector, getChannel } from '../channel';
import { subscriptionsSelector } from '../subscriptions';
import { bookmarksSelector, isBookmarked } from '../bookmarks';

export const playerSelector = state => state.player;

export const isPlaying = (player, episode) => (player.playing && player.episode) ? player.episode.id === episode.id : false;

export const playingEpisodeSelector = createSelector(
  playerSelector,
  channelSelector,
  subscriptionsSelector,
  bookmarksSelector,
  (player, channel, subscriptions, bookmarks) => {
    const { episode } = player;
    if (!episode) {
      return null;
    }
    return {
      ...episode,
      playing: true,
      bookmarked: isBookmarked(bookmarks, episode),
      channel: getChannel(episode, channel, subscriptions),
    };
  }
);
