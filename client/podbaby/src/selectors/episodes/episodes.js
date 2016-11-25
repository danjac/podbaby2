import { createSelector } from 'reselect';

import { channelSelector } from '../channel';
import { subscriptionsSelector, isSubscribed } from '../subscriptions';
import { bookmarksSelector, isBookmarked } from '../bookmarks';
import { playerSelector, isPlaying } from '../player';
import { historySelector, lastPlayed } from '../history';

export const episodesSelector = createSelector(
  state => state.episodes.results,
  channelSelector,
  playerSelector,
  historySelector,
  subscriptionsSelector,
  bookmarksSelector,
  (episodes,
    channel,
    player,
    history,
    subscriptions,
    bookmarks) => episodes.map(episode => {
    const selectedChannel = episode.channel || channel;
    const subscribed = isSubscribed(subscriptions, selectedChannel);
    return {...episode,
      bookmarked: isBookmarked(bookmarks, episode),
      playing: isPlaying(player, episode),
      lastPlayed: lastPlayed(history, episode),
      channel: {
        ...selectedChannel,
        subscribed,
      },
    };
  })
);
