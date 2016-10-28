import * as api from '../api';
import * as storage from '../storage';

import {
  START_PLAYER,
  STOP_PLAYER,
} from '../action-types';

export function reloadPlayer() {
  // get seconds played
  return dispatch => {
    const episode = storage.player.getEpisode();
    if (episode) {
      dispatch(startPlayer(episode, false));
    }
  };
}

export function savePlayer(episode, seconds) {
  storage.player.save

}

export function startPlayer(episode, notify) {

  if (notify) {
    api.player.notify(episode.id);
  }

  return {
    type: START_PLAYER,
    payload: {
      episode,
    },
  };
}

export function stopPlayer() {
  return {
    type: STOP_PLAYER
  };
}
