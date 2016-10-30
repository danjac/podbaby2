import {
  START_PLAYER,
  // STOP_PLAYER,
  // RELOAD_PLAYER,
} from '../action-types';

import {
  startPlayer,
  // reloadPlayer,
  // stopPlayer,
  // savePlayer,
} from './player';

jest.mock('../api');
jest.mock('../local-storage');

describe('startPlayer', () => {

  const api = require('../api');
  const storage = require('../local-storage');

  beforeEach(() => {
    api.plays.save.mockClear();
    storage.player.save.mockClear();
  });

  it('should notify server', () => {
    const episode = {
      id: 1,
    };

    const action = startPlayer(episode, true);
    expect(action.type).toBe(START_PLAYER);
    expect(action.payload).toBe(episode);

    expect(api.plays.save).toBeCalledWith(episode.id);

    expect(storage.player.save).toBeCalledWith({
      episode,
      currentTime: 0,
    });

  });

  it('should not notify server', () => {
    const episode = {
      id: 1,
    };

    const action = startPlayer(episode, false);
    expect(action.type).toBe(START_PLAYER);
    expect(action.payload).toBe(episode);

    expect(api.plays.save).not.toBeCalled();

    expect(storage.player.save).toBeCalledWith({
      episode,
      currentTime: 0,
    });
  });
});
