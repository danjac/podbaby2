import { createSelector } from 'reselect';

import { subscriptionsSelector, isSubscribed } from '../subscriptions';
import { bookmarksSelector, isBookmarked } from '../bookmarks';
import { playerSelector, isPlaying } from '../player';
import { historySelector, lastPlayed } from '../history';


export const episodesSelector = createSelector(
  state => state.episodes.results,
  playerSelector,
  historySelector,
  subscriptionsSelector,
  bookmarksSelector,
  (episodes, player, history, subscriptions, bookmarks) => episodes.map(episode => {
    const subscribed = isSubscribed(subscriptions, episode.channel);
    return {...episode,
      bookmarked: isBookmarked(bookmarks, episode),
      playing: isPlaying(player, episode),
      lastPlayed: lastPlayed(history, episode),
      channel: {
        ...episode.channel,
        subscribed,
      },
    };
  })
);
