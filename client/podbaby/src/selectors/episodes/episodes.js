import { createSelector } from 'reselect';

import { channelSelector, getChannel } from '../channel';
import { subscriptionsSelector } from '../subscriptions';
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
    return {...episode,
      bookmarked: isBookmarked(bookmarks, episode),
      playing: isPlaying(player, episode),
      lastPlayed: lastPlayed(history, episode),
      channel: getChannel(episode, channel, subscriptions),
    };
  })
);
