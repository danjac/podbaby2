import {
  ADD_BOOKMARK,
  REMOVE_BOOKMARK,
  FETCH_USER_SUCCESS,
  LOGOUT,
} from '../../actionTypes';

const initialState = [];

export default function(state = initialState, action) {

  switch (action.type) {

    case LOGOUT:
      return [];

    case FETCH_USER_SUCCESS:
      return action.payload.bookmarks;

    case ADD_BOOKMARK:
      return state.concat(action.payload.id);

    case REMOVE_BOOKMARK:
      return state.filter(id => id !== action.payload.id);

    default:
      return state;
  }

}
