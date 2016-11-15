import * as storage from '../storage';
import { createAction } from './utils';

import {
  START_PLAYER,
  STOP_PLAYER,
  RELOAD_PLAYER,
  UPDATE_PLAYER_TIME,
} from '../actionTypes';

import { addPlay } from './history';

export function reloadPlayer() {
  return createAction(RELOAD_PLAYER, storage.player.load());
}

export function updatePlayerCurrentTime(episode, currentTime) {
  saveSessionState(episode, currentTime);
  return createAction(UPDATE_PLAYER_TIME, currentTime);
}

export function startPlayer(episode, authenticated) {

  return dispatch => {

    saveSessionState(episode, 0);

    if (authenticated) {
      dispatch(addPlay(episode));
    }

    dispatch(createAction(START_PLAYER, episode));
  };
}

export function stopPlayer() {
  storage.player.remove();

  return createAction(STOP_PLAYER);
}

export function saveSessionState(episode, currentTime) {
  storage.player.save({ episode, currentTime });
}
