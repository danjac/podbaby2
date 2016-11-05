import {
  channelsSelector,
  episodesSelector,
  playingEpisodeSelector,
} from './selectors';

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

describe('episodesSelector', () => {
  it('should indicate bookmarks, subscribed, playing', () => {

    const state = {
      episodes: {
        results: [{
          id: 1,
          title: 'first',
          channel: {
            id: 1,
            name: 'first',
          },
        }, {
          id: 2,
          title: 'second',
          channel: {
            id: 2,
            name: 'second',
          },
        }, {
          id: 3,
          title: 'third',
          channel: {
            id: 3,
            name: 'third',
          },
        }],
      },
      subscriptions: [2],
      bookmarks: [1],
      player: {
        playing: true,
        episode: {
          id: 3,
          title: 'third',
        },
      },
    };

    const episodes = episodesSelector(state);
    expect(episodes.length).toBe(3);

    expect(episodes[0].subscribed).toBe(false);
    expect(episodes[0].bookmarked).toBe(true);
    expect(episodes[0].playing).toBe(false);

    expect(episodes[1].subscribed).toBe(true);
    expect(episodes[1].bookmarked).toBe(false);
    expect(episodes[1].playing).toBe(false);

    expect(episodes[2].subscribed).toBe(false);
    expect(episodes[2].bookmarked).toBe(false);
    expect(episodes[2].playing).toBe(true);
  });
});
