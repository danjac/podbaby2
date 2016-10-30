import * as api from '../api';
import * as storage from '../local-storage';

import {
  START_PLAYER,
  STOP_PLAYER,
  RELOAD_PLAYER,
} from '../action-types';

export function reloadPlayer() {
  return {
    type: RELOAD_PLAYER,
    payload: storage.player.load(),
  };
}

export function startPlayer(episode, notify = false) {

  if (notify) {
    api.plays.save(episode.id);
  }

  savePlayer(episode, 0);

  return {
    type: START_PLAYER,
    payload: episode,
  };
}

export function stopPlayer() {
  storage.player.remove();

  return {
    type: STOP_PLAYER,
  };
}

export function savePlayer(episode, currentTime) {
  storage.player.save({
    episode,
    currentTime,
  });
}
