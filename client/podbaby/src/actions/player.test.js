import {
  START_PLAYER,
  STOP_PLAYER,
  RELOAD_PLAYER,
} from '../action-types';

import {
  startPlayer,
  reloadPlayer,
  stopPlayer,
} from './player';

jest.mock('../api');
jest.mock('../local-storage');

describe('stopPlayer', () => {

  const storage = require('../local-storage');

  it('should remove player on stop', () => {
    const action = stopPlayer();
    expect(action.type).toBe(STOP_PLAYER);
    expect(storage.player.remove).toBeCalled();
  });

});

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

describe('reloadPlayer', () => {

  const storage = require('../local-storage');

  beforeEach(() => {
    storage.player.load.mockClear();
  });

  it('should have null in payload if empty', () => {
    storage.player.load.mockImplementation(() => null);
    const action = reloadPlayer();
    expect(action.type).toBe(RELOAD_PLAYER);
    expect(action.payload).toBe(null);
  });

  it('should have episode and current time in payload', () => {
    const payload = {
      episode: {
        id: 1,
      },
      currentTime: 300,
    };
    storage.player.load.mockImplementation(() => payload);
    const action = reloadPlayer();
    expect(action.type).toBe(RELOAD_PLAYER);
    expect(action.payload).toBe(payload);
  });


});
