import {
  ADD_BOOKMARK,
  REMOVE_BOOKMARK,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  NOT_AUTHENTICATED,
  LOGOUT,
} from '../action-types';

const initialState = [];

export default function(state = initialState, action) {

  if ([
      LOGOUT,
      FETCH_USER_FAILURE,
      NOT_AUTHENTICATED,
    ].includes(action.type)) {
    return [];
  }

  switch (action.type) {

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
