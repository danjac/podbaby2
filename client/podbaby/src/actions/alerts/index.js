import { uniqueId, partial } from 'lodash';

import { CREATE_ALERT, DISMISS_ALERT } from '../../actionTypes';

export const dismissAlert = id => ({
  type: DISMISS_ALERT,
  payload: { id },
});

export const createAlert = (style, message) => {
  return {
    type: CREATE_ALERT,
    payload: {
      id: uniqueId(),
      style,
      message,
    },
  };
};

export const info = partial(createAlert, 'info');
export const success = partial(createAlert, 'success');
export const warning = partial(createAlert, 'warning');
export const danger = partial(createAlert, 'danger');
