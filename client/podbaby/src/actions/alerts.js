import {
  uniqueId,
  partial,
} from 'lodash';

import {
  CREATE_ALERT,
  DISMISS_ALERT,
} from '../action-types';


export const dismissAlert = id => {
  return {
    type: DISMISS_ALERT,
    payload: id,
  };
};

export const createAlert = (style, message) => {
  const id = uniqueId();
  return dispatch => {
    dispatch({
      type: CREATE_ALERT,
      payload: {
        id,
        style,
        message,
      },
    });
    window.setTimeout(() => {
      dispatch(dismissAlert(id));
    }, 3000);
  };
};

export const info = partial(createAlert, 'info');
export const success = partial(createAlert, 'success');
export const warning = partial(createAlert, 'warning');
export const danger = partial(createAlert, 'danger');
