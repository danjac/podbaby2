import { channelsSelector } from './index';

describe('channelsSelector', () => {
  it('should indicate channels subscribed', () => {

    const state = {
      channels: {
        results: [{
          id: 1,
          name: 'first',
        }, {
          id: 2,
          name: 'second',
        }],
      },
      subscriptions: [2],
    };

    const channels = channelsSelector(state);

    expect(channels.length).toBe(2);
    expect(channels[0].subscribed).toBe(false);
    expect(channels[1].subscribed).toBe(true);

  });
});
