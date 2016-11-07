import { createSelector } from 'reselect';
import { channelSelector } from './channel';
import { subscriptionsSelector, isSubscribed } from './subscriptions';
import { bookmarksSelector, isBookmarked } from './bookmarks';
import { playerSelector, isPlaying } from './player';

const resultsSelector = state => state.episodes.results;

export const channelEpisodesSelector = createSelector(
  resultsSelector,
  channelSelector,
  playerSelector,
  bookmarksSelector,
  (episodes, channel, player, bookmarks) => {
    if (!channel) {
      return [];
    }
    return episodes.map(episode => {
      return {...episode,
        subscribed: channel.subscribed,
        bookmarked: isBookmarked(bookmarks, episode),
        playing: isPlaying(player, episode),
        channel: channel,
      };
    });
  },
);

export const episodesSelector = createSelector(
  resultsSelector,
  playerSelector,
  subscriptionsSelector,
  bookmarksSelector,
  (episodes, player, subscriptions, bookmarks) => {
    return episodes.filter(episode => episode.channel).map(episode => {
      const subscribed = isSubscribed(subscriptions, episode.channel);
      return {...episode,
        subscribed,
        bookmarked: isBookmarked(bookmarks, episode),
        playing: isPlaying(player, episode),
        channel: {
          ...episode.channel,
          subscribed,
        },
      };
    });
  },
);
