import { createSelector } from 'reselect';

import { subscriptionsSelector, isSubscribed } from './subscriptions';

export const channelSelector = createSelector(
  state => state.channel.channel,
  subscriptionsSelector,
  (channel, subscriptions) => {
    if(!channel) {
      return null;
    }
    return {
      ...channel,
      subscribed: isSubscribed(subscriptions, channel),
    };
  }
);
