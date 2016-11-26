import {
  START_PLAYER,
  STOP_PLAYER,
  RELOAD_PLAYER,
  UPDATE_PLAYER_TIME,
} from '../../actionTypes';

import * as storage from '../../storage';

const saveSessionState = (episode, currentTime) => {
  storage.player.save({ episode, currentTime });
};

export const reloadPlayer = () => ({
  type: RELOAD_PLAYER,
  payload: storage.player.load(),
});

export const updatePlayerCurrentTime = (episode, currentTime) => {
  saveSessionState(episode, currentTime);
  return {
    type: UPDATE_PLAYER_TIME,
    payload: currentTime,
  };
};

export const startPlayer = episode => {

  saveSessionState(episode, 0);

  return {
    type: START_PLAYER,
    payload: episode,
  };

};

export const stopPlayer = () => {
  storage.player.remove();
  return { type: STOP_PLAYER };
};


