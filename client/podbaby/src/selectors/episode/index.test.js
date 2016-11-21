import { episodeSelector } from './index';

describe('episodeSelector', () => {
  it('should return null if not available', () => {
    const state = {
      player: {
        playing: false,
        episode: null,
      },
      subscriptions: [],
      bookmarks: [],
      history: [],
      episode: {
        episode: null,
      },
    };
    expect(episodeSelector(state)).toBe(null);
  });

  it('should indicate if episode is playing', () => {
    const state = {
      episode: {
        episode: {
          id: 1,
          channel: {
            id: 1,
          },
        },
      },
      player: {
        episode: {
          id: 1,
        },
        playing: true,
      },
      subscriptions: [],
      bookmarks: [],
      history: [],
    };
    const episode = episodeSelector(state);
    expect(episode.id).toBe(state.episode.episode.id);
    expect(episode.bookmarked).toBe(false);
    expect(episode.subscribed).toBe(false);
    expect(episode.channel.subscribed).toBe(false);
    expect(episode.playing).toBe(true);
  });

  it('should indicate if episode bookmarked', () => {
    const state = {
      episode: {
        episode: {
          id: 1,
          channel: {
            id: 1,
          },
        },
      },
      player: {
        episode: null,
      },
      subscriptions: [2],
      bookmarks: [1],
      history: [],
    };
    const episode = episodeSelector(state);
    expect(episode.id).toBe(state.episode.episode.id);
    expect(episode.bookmarked).toBe(true);
    expect(episode.subscribed).toBe(false);
    expect(episode.channel.subscribed).toBe(false);
    expect(episode.playing).toBe(false);
    expect(episode.lastPlayed).toBe(undefined);
  });

  it('should indicate if episode channel subscribed', () => {
    const state = {
      episode: {
        episode: {
          id: 1,
          channel: {
            id: 1,
          },
        },
      },
      player: {
        episode: null,
      },
      subscriptions: [1],
      bookmarks: [2],
      history: [],
    };
    const episode = episodeSelector(state);
    expect(episode.id).toBe(state.episode.episode.id);
    expect(episode.bookmarked).toBe(false);
    expect(episode.subscribed).toBe(true);
    expect(episode.channel.subscribed).toBe(true);
    expect(episode.playing).toBe(false);
    expect(episode.lastPlayed).toBe(undefined);
  });

  it('should indicate if episode channel last played', () => {
    const now = new Date();
    const state = {
      episode: {
        episode: {
          id: 1,
          channel: {
            id: 1,
          },
        },
      },
      player: {
        episode: null,
      },
      subscriptions: [],
      bookmarks: [],
      history: [
        {
          episode: 1,
          created: now,
        },
      ],
    };
    const episode = episodeSelector(state);
    expect(episode.id).toBe(state.episode.episode.id);
    expect(episode.bookmarked).toBe(false);
    expect(episode.subscribed).toBe(false);
    expect(episode.channel.subscribed).toBe(false);
    expect(episode.playing).toBe(false);
    expect(episode.lastPlayed).toEqual(now);
  });
});
