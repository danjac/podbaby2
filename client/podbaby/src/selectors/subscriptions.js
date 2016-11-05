export const subscriptionsSelector = state => state.subscriptions;
export const isSubscribed = (subscriptions, channel) => subscriptions.includes(channel.id);
