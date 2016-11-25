import {
  CREATE_ALERT,
  DISMISS_ALERT,
} from '../../actionTypes';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_ALERT:
      return state.concat(action.payload);
    case DISMISS_ALERT:
      return state.filter(alert => alert.id !== action.payload.id);
    default:
      return state;
  }
}
