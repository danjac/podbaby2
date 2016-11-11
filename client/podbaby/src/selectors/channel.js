import { createSelector } from 'reselect';

import { bookmarksSelector, isBookmarked } from './bookmarks';
import { playerSelector, isPlaying } from './player';
import { subscriptionsSelector, isSubscribed } from './subscriptions';

export const channelSelector = createSelector(
  state => state.channel.channel,
  subscriptionsSelector,
  (channel, subscriptions) => {
    if (!channel) {
      return null;
    }
    return {
      ...channel,
      subscribed: isSubscribed(subscriptions, channel),
    };
  }
);

export const channelEpisodesSelector = createSelector(
  state => state.channel.episodes.results,
  playerSelector,
  bookmarksSelector,
  channelSelector,
  (episodes, player, bookmarks, channel) => {
    if (!channel) {
      return [];
    }
    return episodes.map(episode => {
      return {...episode,
        bookmarked: isBookmarked(bookmarks, episode),
        playing: isPlaying(player, episode),
        channel,
      };
    });
  },
);
