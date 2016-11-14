import {
  RELOAD_PLAYER,
  START_PLAYER,
  STOP_PLAYER,
} from '../actionTypes';


const initialState = {
  playing: false,
  currentTime: 0,
  episode: null,
};

export default function(state = initialState, action) {

  switch (action.type) {

    case START_PLAYER:

      return {
        ...state,
        episode: action.payload,
        currentTime: 0,
        playing: true,
        };

    case STOP_PLAYER:
      return {
        ...state,
        episode: null,
        currentTime: 0,
        playing: false,
      };

    case RELOAD_PLAYER:

      if (action.payload) {
        return {
          ...state,
          ...action.payload,
          playing: true,
        };
      } else {
        return {
          ...state,
          episode: null,
          currentTime: 0,
          playing: false,
        };
      }

    default:
      return state;
  }

}
