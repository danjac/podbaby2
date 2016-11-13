import * as api from '../api';
import * as storage from '../storage';
import { createAction } from './utils';

import {
  START_PLAYER,
  STOP_PLAYER,
  RELOAD_PLAYER,
} from '../actionTypes';

export function reloadPlayer() {
  return createAction(RELOAD_PLAYER, storage.player.load());
}

export function startPlayer(episode, authenticated) {

  if (authenticated) {
    api.episodes.play(episode.id);
  }

  saveSessionState(episode, 0);

  return createAction(START_PLAYER, episode);
}

export function stopPlayer() {
  storage.player.remove();

  return createAction(STOP_PLAYER);
}

export function saveSessionState(episode, currentTime) {
  storage.player.save({ episode, currentTime });
}
