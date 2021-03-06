import { episodesSelector } from './episodes';

describe('episodesSelector', () => {
  it('should indicate bookmarks, subscribed, playing', () => {

    const now = new Date();

    const state = {
      channel: {
        channel: null,
      },
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
      history: [
        {
          episode: 1,
          created: now,
        },
      ],
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

    expect(episodes[0].channel.subscribed).toBe(false);
    expect(episodes[0].bookmarked).toBe(true);
    expect(episodes[0].playing).toBe(false);
    expect(episodes[0].lastPlayed).toEqual(now);

    expect(episodes[1].channel.subscribed).toBe(true);
    expect(episodes[1].bookmarked).toBe(false);
    expect(episodes[1].playing).toBe(false);
    expect(episodes[1].lastPlayed).toBe(undefined);

    expect(episodes[2].channel.subscribed).toBe(false);
    expect(episodes[2].bookmarked).toBe(false);
    expect(episodes[2].playing).toBe(true);
    expect(episodes[2].lastPlayed).toBe(undefined);
  });
});
