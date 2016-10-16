import { createSelector } from 'reselect';

import {
  subscriptionsSelector,
} from './auth';

const resultsSelector = state => state.channels.results;

export const channelsSelector = createSelector(
  resultsSelector,
  subscriptionsSelector,
  (channels, subscriptions) => {
    console.log("CHANNELS", channels);
    return channels.map(channel => {
      const isSubscribed = subscriptions.includes(channel.id);
      return { ...channel, isSubscribed };
    });
  }
);
