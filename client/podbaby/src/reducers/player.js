import {
  RELOAD_PLAYER,
  LOGOUT,
  FETCH_USER_SUCCESS,
  START_PLAYER,
  STOP_PLAYER,
} from '../actionTypes';


const initialState = {
  playing: false,
  currentTime: 0,
  episode: null,
  plays: [],
};

export default function(state = initialState, action) {

  switch (action.type) {

    case START_PLAYER:

      return {
        ...state,
        episode: action.payload,
        currentTime: 0,
        playing: true,
        plays: state.plays.concat({
          episode: action.payload.id,
          created: new Date(),
        }),
      };

    case LOGOUT:
      return {
        ...state,
        plays: [],
      };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        plays: action.payload.plays,
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
