import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer, {
  subscribe,
  unsubscribe,
  addBookmark,
  removeBookmark,
  getCurrentUser,
  logout,
  ADD_BOOKMARK,
  REMOVE_BOOKMARK,
  SUBSCRIBE,
  UNSUBSCRIBE,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  GET_USER_SUCCESS,
} from './auth';


const mockStore = configureMockStore([thunk]);

jest.mock('../utils/storage');
jest.mock('../utils/api');

it('Should subscribe to a channel', () => {
  const store = mockStore();

  const channel = { id: 1 };
  store.dispatch(subscribe(channel));
  const actions = store.getActions();
  expect(actions[1].payload).toEqual(channel.id);
});

it('Should unsubscribe from a channel', () => {
  const store = mockStore();

  const channel = { id: 1 };
  store.dispatch(unsubscribe(channel));
  const actions = store.getActions();
  expect(actions[1].payload).toEqual(channel.id);
});

it('Should add a bookmark', () => {
  const store = mockStore();

  const episode = { id: 1 };
  store.dispatch(addBookmark(episode));
  const actions = store.getActions();
  expect(actions[1].payload).toEqual(episode.id);
});

it('Should remove a bookmark', () => {
  const store = mockStore();

  const episode = { id: 1 };
  store.dispatch(removeBookmark(episode));
  const actions = store.getActions();
  expect(actions[1].payload).toEqual(episode.id);
});

it('Should get the current user if logged out', () => {
  const storage = require('../utils/storage');
  storage.removeAuthToken();

  const store = mockStore();

  store.dispatch(getCurrentUser());
  const actions = store.getActions();
  expect(actions.length).toBe(1);
});

it('Should get the current user', () => {
  const storage = require('../utils/storage');
  storage.setAuthToken('fake');

  const store = mockStore();

  return store.dispatch(getCurrentUser())
    .then(() => {
    const actions = store.getActions();
    expect(actions.length).toBe(2);
    const payload = actions[1].payload;
    expect(payload.email).toEqual('tester@gmail.com');
    storage.removeAuthToken();
   });
});

it('Should log out the user', () => {
  const storage = require('../utils/storage');
  storage.setAuthToken('fake');
  const store = mockStore();
  store.dispatch(logout());
  const actions = store.getActions();
  expect(actions.length).toBe(2);
  expect(storage.getAuthToken()).toBeFalsy();
});

it('Should add a bookmark to the state', () => {
  const action = {
    type: ADD_BOOKMARK,
    payload: 1,
  };

  const state = {
    currentUser: {
      bookmarks: [],
    },
  };

  const newState = reducer(state, action);
  expect(newState.currentUser.bookmarks).toEqual([1]);

});

it('Should remove a bookmark from the state', () => {
  const action = {
    type: REMOVE_BOOKMARK,
    payload: 1,
  };

  const state = {
    currentUser: {
      bookmarks: [1],
    },
  };

  const newState = reducer(state, action);
  expect(newState.currentUser.bookmarks).toEqual([]);

});

it('Should add a subscription to the state', () => {
  const action = {
    type: SUBSCRIBE,
    payload: 1,
  };

  const state = {
    currentUser: {
      subscriptions: [],
    },
  };

  const newState = reducer(state, action);
  expect(newState.currentUser.subscriptions).toEqual([1]);

});

it('Should remove a subscription from the state', () => {
  const action = {
    type: UNSUBSCRIBE,
    payload: 1,
  };

  const state = {
    currentUser: {
      subscriptions: [1],
    },
  };

  const newState = reducer(state, action);
  expect(newState.currentUser.subscriptions).toEqual([]);

});

it('Should mark state as logged in', () => {

  const action = { type: USER_LOGGED_IN };
  const state = { isLoggedIn: false };

  const newState = reducer(state, action);
  expect(newState.isLoggedIn).toBeTruthy();

});

it('Should mark state as logged out', () => {

  const action = { type: USER_LOGGED_OUT };
  const state = { isLoggedIn: true, currentUser: { email: 'tester@gmail.com' } };

  const newState = reducer(state, action);
  expect(newState.isLoggedIn).toBeFalsy();
  expect(newState.currentUser).toBe(null);

});

it('Should add current user to state', () => {

  const payload = { email: 'tester@gmail.com' };
  const action = { type: GET_USER_SUCCESS, payload };
  const state = { isLoggedIn: false, currentUser: null };

  const newState = reducer(state, action);
  expect(newState.isLoggedIn).toBeTruthy();
  expect(newState.currentUser.email).toEqual('tester@gmail.com');

});
