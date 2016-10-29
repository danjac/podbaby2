import {
  ADD_ALERT,
  REMOVE_ALERT,
} from '../action-types';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ALERT:
      return state.concat(action.payload);
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.payload);
    default:
      return state;
  }
}
