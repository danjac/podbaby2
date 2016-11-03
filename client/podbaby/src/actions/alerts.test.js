import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  CREATE_ALERT,
  DISMISS_ALERT,
} from '../action-types';

import {
  createAlert,
} from './alerts';

jest.useFakeTimers();

const createMockStore = configureMockStore([thunk]);

it('creates an alert', () => {

  const store = createMockStore();
  store.dispatch(createAlert('info', 'hello'));
  jest.runAllTimers();
  const actions = store.getActions();

  expect(actions[0].type).toBe(CREATE_ALERT);
  expect(actions[0].payload.style).toBe('info');
  expect(actions[0].payload.message).toBe('hello');
  expect(actions[0].payload.id).toBeDefined();

  expect(actions[1].type).toBe(DISMISS_ALERT);
  expect(actions[1].payload).toBe(actions[0].payload.id);

});
