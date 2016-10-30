import {
  RELOAD_PLAYER,
  START_PLAYER,
  STOP_PLAYER,
} from '../action-types';

import reducer from './player';

it('should handle STOP_PLAYER', () => {

  const state = reducer({
    playing: true,
    episode: {
      id: 1,
    },
    currentTime: 10,
  }, {
    type: STOP_PLAYER,
  });

  expect(state.playing).toBe(false);
  expect(state.currentTime).toBe(0);
  expect(state.episode).toBe(null);

});

it('should handle START_PLAYER', () => {

  const state = reducer({
    episode: null,
    currentTime: 0,
    playing: false,
  }, {
    type: START_PLAYER,
    payload: {
      id: 1,
    },
  });

  expect(state.playing).toBe(true);
  expect(state.episode.id).toBe(1);
});

it('should handle RELOAD_PLAYER', () => {

  const state = reducer({
    episode: null,
    currentTime: 0,
    playing: false,
  }, {
    type: RELOAD_PLAYER,
    payload: {
      episode: {
        id: 1,
      },
      currentTime: 30,
    },
  });

  expect(state.playing).toBe(true);
  expect(state.episode.id).toBe(1);
  expect(state.currentTime).toBe(30);

});

it('should handle RELOAD_PLAYER if null', () => {

  const state = reducer({
    episode: null,
    currentTime: 0,
    playing: false,
  }, {
    type: RELOAD_PLAYER,
    payload: null,
  });

  expect(state.playing).toBe(false);
  expect(state.episode).toBe(null);
  expect(state.currentTime).toBe(0);

});
