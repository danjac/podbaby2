import {
  uniqueId,
  partial,
} from 'lodash';

const NEW_ALERT = 'podbaby/alerts/NEW';
const DISMISS_ALERT = 'podbaby/alerts/DISMISS';

export function createAlert(level, message) {
  const id = uniqueId();
  return dispatch => {
    dispatch({
      type: NEW_ALERT,
      payload: {
        message,
        level,
        id,
      }
    });
    window.setTimeout(() => dispatch(dismissAlert(id)), 5000);
  };
}

export const success = partial(createAlert, 'success');
export const warning = partial(createAlert, 'warning');
export const danger = partial(createAlert, 'danger');
export const info = partial(createAlert, 'info');

export function dismissAlert(id) {
  return {
    type: DISMISS_ALERT,
    payload: {
      id,
    }
  };
}

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case NEW_ALERT:
      return state.concat(action.payload);
    case DISMISS_ALERT:
      return state.filter(item => item.id !== action.payload.id);
    default:
      return state;
  }

}
