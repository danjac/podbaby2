import { CREATE_ALERT, DISMISS_ALERT } from '../../actionTypes';

import { createAlert, dismissAlert } from './alerts';

it('creates an alert', () => {

  const action = createAlert('info', 'hello');

  expect(action.type).toBe(CREATE_ALERT);
  expect(action.payload.style).toBe('info');
  expect(action.payload.message).toBe('hello');
  expect(action.payload.id).toBeDefined();

});

it('dismisses an alert', () => {
  const action = dismissAlert(1);
  expect(action.type).toBe(DISMISS_ALERT);
  expect(action.payload.id).toBe(1);
});

