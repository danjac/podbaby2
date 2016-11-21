import {
  LOGOUT,
  CLEAR_HISTORY,
  FETCH_USER_SUCCESS,
  START_PLAYER,
} from '../../actionTypes';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {

    case START_PLAYER:
      return [
        ...state,
        {
          episode: action.payload.id,
          created: new Date(),
        },
      ];

    case LOGOUT:
      return [];

    case FETCH_USER_SUCCESS:
      return action.payload.plays;

    case CLEAR_HISTORY:
      return [];

    default:
      return state;
  }
}
