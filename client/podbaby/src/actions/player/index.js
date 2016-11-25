import {
  START_PLAYER,
  STOP_PLAYER,
  RELOAD_PLAYER,
  UPDATE_PLAYER_TIME,
} from '../../actionTypes';

import * as api from '../../api';
import * as storage from '../../storage';

import { createAction } from '../utils';

export function reloadPlayer() {
  return createAction(RELOAD_PLAYER, storage.player.load());
}

export function updatePlayerCurrentTime(episode, currentTime) {
  saveSessionState(episode, currentTime);
  return createAction(UPDATE_PLAYER_TIME, currentTime);
}

export function startPlayer(episode, authenticated) {
  saveSessionState(episode, 0);

  if (authenticated) {
    api.history.add(episode.id);
  }

  return createAction(START_PLAYER, episode);
};

export function stopPlayer() {
  storage.player.remove();

  return createAction(STOP_PLAYER);
}

export function saveSessionState(episode, currentTime) {
  storage.player.save({ episode, currentTime });
}
