import {
  RELOAD_PLAYER,
  START_PLAYER,
  STOP_PLAYER,
  UPDATE_PLAYING_TIME,
} from '../action-types';


const initialState = {
  playing: false,
  duration: 0,
  episode: null,
};

export default function(state = initialState, action) {

  switch (action.type) {

    case START_PLAYER:
      return {
        ...state,
        episode: action.payload,
        duration: 0,
        playing: true,
      };

    case STOP_PLAYER:
      return {
        ...state,
        episode: null,
        duration: 0,
        playing: false,
      };

    case RELOAD_PLAYER:
      return {
        ...state,
        ...action.payload,
        playing: true,
      };

    case UPDATE_PLAYING_TIME:
      return {
        ...state,
        duration: action.payload,
      };

    default:
      return state;
  }

}
