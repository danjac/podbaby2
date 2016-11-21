import { playingEpisodeSelector } from './index';

describe('playingEpisodeSelector', () => {
  it('should return null if not playing', () => {
    const state = {
      player: {
        playing: false,
        episode: null,
      },
      subscriptions: [],
      bookmarks: [],
    };
    expect(playingEpisodeSelector(state)).toBe(null);
  });

  it('should indicate if episode bookmarked', () => {
    const state = {
      player: {
        episode: {
          id: 1,
          channel: {
            id: 2,
          },
        },
      },
      subscriptions: [1],
      bookmarks: [1],
    };
    const episode = playingEpisodeSelector(state);
    expect(episode.id).toBe(state.player.episode.id);
    expect(episode.bookmarked).toBe(true);
    expect(episode.subscribed).toBe(false);
    expect(episode.playing).toBe(true);
  });

  it('should indicate if episode channel subscribed', () => {
    const state = {
      player: {
        episode: {
          id: 1,
          channel: {
            id: 2,
          },
        },
      },
      subscriptions: [2],
      bookmarks: [],
    };
    const episode = playingEpisodeSelector(state);
    expect(episode.id).toBe(state.player.episode.id);
    expect(episode.bookmarked).toBe(false);
    expect(episode.subscribed).toBe(true);
    expect(episode.playing).toBe(true);
  });
});


