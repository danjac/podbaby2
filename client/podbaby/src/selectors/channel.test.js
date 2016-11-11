import { channelSelector, channelEpisodesSelector } from './channel';

describe('channelEpisodesSelector', () => {

  it('should be empty if no channel selected', () => {
    const state = {
      channel: {
        channel: null,
        episodes: {
          results: [
            {
              id: 1,
              title: 'test',
            },
          ],
          next: null,
          previous: null,
        },
      },
      subscriptions: [1],
      bookmarks: [],
      player: {
        episode: null,
      },
    };

    const episodes = channelEpisodesSelector(state);
    expect(episodes.length).toBe(0);

  });

  it('should include channel', () => {
    const state = {
      channel: {
        channel: {
          id: 1,
          name: 'first',
        },
        episodes: {
          results: [
            {
              id: 1,
              title: 'test',
            },
          ],
          next: null,
          previous: null,
        },
      },
      subscriptions: [1],
      bookmarks: [],
      player: {
        episode: null,
      },
    };

    const episodes = channelEpisodesSelector(state);
    expect(episodes.length).toBe(1);
    expect(episodes[0].channel.id).toBe(1);

  });
});

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
