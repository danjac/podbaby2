import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  createAlert,
  dismissAlert,
  success,
  warning,
  danger,
  info,
} from './alerts';
import reducer from './alerts';

jest.useFakeTimers();

const mockStore = configureMockStore([thunk]);

it('creates a success alert', () => {
  const store = mockStore();
  store.dispatch(success('hello'));
  const action = store.getActions()[0];
  expect(action.payload.message).toBe('hello');
  expect(action.payload.level).toBe('success');
  expect(action.payload.id).toBeDefined();
});

it('creates a warning alert', () => {
  const store = mockStore();
  store.dispatch(warning('hello'));
  const action = store.getActions()[0];
  expect(action.payload.message).toBe('hello');
  expect(action.payload.level).toBe('warning');
  expect(action.payload.id).toBeDefined();
});

it('creates a danger alert', () => {
  const store = mockStore();
  store.dispatch(danger('hello'));
  const action = store.getActions()[0];
  expect(action.payload.message).toBe('hello');
  expect(action.payload.level).toBe('danger');
  expect(action.payload.id).toBeDefined();
});

it('creates an info alert', () => {
  const store = mockStore();
  store.dispatch(info('hello'));
  const action = store.getActions()[0];
  expect(action.payload.message).toBe('hello');
  expect(action.payload.level).toBe('info');
  expect(action.payload.id).toBeDefined();
});



it('creates a new alert', () => {
  const store = mockStore();
  store.dispatch(createAlert('success', 'hello'));
  jest.runOnlyPendingTimers();
  const [create, dismiss] = store.getActions();
  expect(create.payload.message).toBe('hello');
  expect(create.payload.level).toBe('success');
  expect(create.payload.id).toBeDefined();
  expect(dismiss.payload.id).toBe(create.payload.id);
});

it('dismisses an alert', () => {
  const action = dismissAlert('123');
  expect(action.payload.id).toBe('123');
});

it('adds a new alert to state', () => {
  const store = mockStore();
  store.dispatch(createAlert('success', 'hello'));
  const action = store.getActions()[0];
  const state = reducer({
    alerts: []
  }, action);
  expect(state.alerts.length).toBe(1);
});

it('removes an alert from state', () => {
  const alerts = [{
      id: '123',
      message: 'hello',
      level: 'success',
    }, {
      id: '456',
      message: 'goodbye',
      level: 'success',
    }

  ];
  const action = dismissAlert('123');
  const state = reducer({
    alerts: alerts
  }, action);
  expect(state.alerts.length).toBe(1);
  expect(state.alerts[0].id).toBe('456');
});
