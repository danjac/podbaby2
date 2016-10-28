import {
  ADD_BOOKMARK,
  REMOVE_BOOKMARK,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  LOGOUT,
} from '../action_types';

const initialState = [];

export default function(state = initialState, action) {

  switch (action.type) {

    case LOGOUT:
      return [];

    case FETCH_USER_FAILURE:
      return [];

    case FETCH_USER_SUCCESS:
      return action.payload.bookmarks;

    case ADD_BOOKMARK:
      return state.concat(action.payload);

    case REMOVE_BOOKMARK:
      return state.filter(id => id !== action.payload);

    default:
      return state;
  }

}
