import * as api from '../api';
import * as storage from '../local-storage';
import { createAction } from '../utils';

import {
  START_PLAYER,
  STOP_PLAYER,
  RELOAD_PLAYER,
} from '../action-types';

export function reloadPlayer() {
  return createAction(RELOAD_PLAYER, storage.player.load());
}

export function startPlayer(episode, notify = false) {

  if (notify) {
    api.plays.save(episode.id);
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
