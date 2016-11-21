import {
  START_PLAYER,
  LOGOUT,
  FETCH_USER_SUCCESS,
  CLEAR_HISTORY,
} from '../../actionTypes';

import reducer from './index';

it('it should handle START_PLAYER', () => {
  const state = reducer([], {
    type: START_PLAYER,
    payload: { id: 1 },
  });
  expect(state.length).toBe(1);
  expect(state[0].episode).toBe(1);
  expect(state[0].created instanceof Date).toBeTruthy();
  // expect(state[0].created).toBeInstanceOf(Date);
});

it('it should handle LOGOUT', () => {
  const state = reducer([
    {
      episode: 1,
      created: new Date(),
    },
  ], {
    type: LOGOUT,
  });

  expect(state).toEqual([]);
});

it('it should handle CLEAR_HISTORY', () => {
  const state = reducer([
    {
      episode: 1,
      created: new Date(),
    },
  ], {
    type: CLEAR_HISTORY,
  });

  expect(state).toEqual([]);
});

it('it should handle FETCH_USER_SUCCESS', () => {
  const state = reducer([], {
    type: FETCH_USER_SUCCESS,
    payload: {
      email: 'tester@gmail.com',
      bookmarks: [],
      subscriptions: [],
      plays: [
        {
          episode: 1,
          created: new Date(),
        },
      ],
    },
  });
  expect(state.length).toBe(1);
  expect(state[0].episode).toBe(1);
  expect(state[0].created instanceof Date).toBeTruthy();
  // expect(state[0].created).toBeInstanceOf(Date);
});
