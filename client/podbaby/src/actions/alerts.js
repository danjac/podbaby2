import { uniqueId, partial } from 'lodash';

import { CREATE_ALERT, DISMISS_ALERT } from '../actionTypes';
import { createAction } from './utils';


export const dismissAlert = id => createAction(DISMISS_ALERT, id);

export const createAlert = (style, message) => {
  const id = uniqueId();
  return dispatch => {
    dispatch(createAction(CREATE_ALERT, {
      id,
      style,
      message,
    }));
    window.setTimeout(() => {
      dispatch(dismissAlert(id));
    }, 3000);
  };
};

export const info = partial(createAlert, 'info');
export const success = partial(createAlert, 'success');
export const warning = partial(createAlert, 'warning');
export const danger = partial(createAlert, 'danger');
