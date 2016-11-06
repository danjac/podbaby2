import { episodeSelector } from './episode';

describe('episodeSelector', () => {
  it('should return null if not available', () => {
    const state = {
      player: {
        playing: false,
        episode: null,
      },
      subscriptions: [],
      bookmarks: [],
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
    };
    const episode = episodeSelector(state);
    expect(episode.id).toBe(state.episode.episode.id);
    expect(episode.bookmarked).toBe(true);
    expect(episode.subscribed).toBe(false);
    expect(episode.channel.subscribed).toBe(false);
    expect(episode.playing).toBe(false);
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
    };
    const episode = episodeSelector(state);
    expect(episode.id).toBe(state.episode.episode.id);
    expect(episode.bookmarked).toBe(false);
    expect(episode.subscribed).toBe(true);
    expect(episode.channel.subscribed).toBe(true);
    expect(episode.playing).toBe(false);
  });
});


