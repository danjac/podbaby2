import {
  SUBSCRIBE,
  UNSUBSCRIBE,
  FETCH_USER_SUCCESS,
  LOGOUT,
} from '../action-types';

const initialState = [];

export default function(state = initialState, action) {

  switch (action.type) {

    case LOGOUT:
      return [];

    case FETCH_USER_SUCCESS:
      return action.payload.subscriptions;

    case SUBSCRIBE:
      return state.concat(action.payload);

    case UNSUBSCRIBE:
      return state.filter(id => id !== action.payload);

    default:
      return state;
  }

}