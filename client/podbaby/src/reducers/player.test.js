import {
  RELOAD_PLAYER,
  START_PLAYER,
  STOP_PLAYER,
  UPDATE_PLAYING_TIME,
} from '../action-types';

import reducer from './player';

it('should handle UPDATE_PLAYING_TIME', () => {

  const state = reducer({
    duration: 10,
  }, {
    type: UPDATE_PLAYING_TIME,
    payload: 15,
  });

  expect(state.duration).toEqual(15);

});

it('should handle STOP_PLAYER', () => {

  const state = reducer({
    playing: true,
    episode: {
      id: 1,
    },
    duration: 10,
  }, {
    type: STOP_PLAYER,
  });

  expect(state.playing).toEqual(false);
  expect(state.duration).toEqual(0);
  expect(state.episode).toEqual(null);

});

it('should handle START_PLAYER', () => {

  const state = reducer({
    episode: null,
    duration: 0,
    playing: false,
  }, {
    type: START_PLAYER,
    payload: {
      id: 1,
    },
  });

  expect(state.playing).toEqual(true);
  expect(state.episode.id).toEqual(1);
});

it('should handle RELOAD_PLAYER', () => {

  const state = reducer({
    episode: null,
    duration: 0,
    playing: false,
  }, {
    type: RELOAD_PLAYER,
    payload: {
      episode: {
        id: 1,
      },
      duration: 30,
    },
  });

  expect(state.playing).toEqual(true);
  expect(state.episode.id).toEqual(1);
  expect(state.duration).toEqual(30);
});
