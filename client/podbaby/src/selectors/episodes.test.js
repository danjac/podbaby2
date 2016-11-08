import { episodesSelector } from './episodes';

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

    expect(episodes[0].channel.subscribed).toBe(false);
    expect(episodes[0].bookmarked).toBe(true);
    expect(episodes[0].playing).toBe(false);

    expect(episodes[1].channel.subscribed).toBe(true);
    expect(episodes[1].bookmarked).toBe(false);
    expect(episodes[1].playing).toBe(false);

    expect(episodes[2].channel.subscribed).toBe(false);
    expect(episodes[2].bookmarked).toBe(false);
    expect(episodes[2].playing).toBe(true);
  });
});
