import { channelSelector } from './channel';

describe('channelSelector', () => {

  it('should return null if no channel', () => {
    const state = {
      channel: {
        channel: null,
      },
      subscriptions: [1],
    };

    const channel = channelSelector(state);
    expect(channel).toBe(null);
  });


  it('should indicate channel subscribed', () => {
    const state = {
      channel: {
        channel: {
          id: 1,
          name: 'first',
        },
      },
      subscriptions: [1],
    };

    const channel = channelSelector(state);
    expect(channel.subscribed).toBe(true);
  });

  it('should indicate channel not subscribed', () => {

    const state = {
      channel: {
        channel: {
          id: 1,
          name: 'first',
        },
      },
      subscriptions: [2],
    };

    const channel = channelSelector(state);
    expect(channel.subscribed).toBe(false);
  });
});
