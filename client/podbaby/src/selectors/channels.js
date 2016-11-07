import { createSelector } from 'reselect';

import { subscriptionsSelector, isSubscribed } from './subscriptions';

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
