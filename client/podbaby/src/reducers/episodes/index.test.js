import {
  FETCH_EPISODES_REQUEST,
  FETCH_EPISODES_SUCCESS,
  FETCH_EPISODES_FAILURE,
  CLEAR_HISTORY,
} from '../../actionTypes';

import reducer from './index';

it('should handle CLEAR HISTORY', () => {

  const state = reducer({
    results: [
      {
        id: 1,
      },
    ],
    next: 3,
    previous: 1,
  }, {
    type: CLEAR_HISTORY,
  });

  expect(state.results).toEqual([]);
  expect(state.next).toBe(0);
  expect(state.previous).toBe(0);
});

it('should handle FETCH_EPISODES_REQUEST', () => {

  const state = reducer({
    loading: false,
  }, {
    type: FETCH_EPISODES_REQUEST,
  });

  expect(state.loading).toEqual(true);
});

it('should handle FETCH_EPISODES_FAILURE', () => {

  const error = new Error('Whoops');

  const state = reducer({
    loading: true,
  }, {
    type: FETCH_EPISODES_FAILURE,
    error,
  });

  expect(state.loading).toEqual(false);
  expect(state.error).toEqual(error);

});

it('should handle FETCH_EPISODES_SUCCESS', () => {

  const state = reducer({
    loading: true,
    results: [],
    next: 0,
    previous: 0,
  }, {
    type: FETCH_EPISODES_SUCCESS,
    payload: {
      results: [{
        id: 1,
        title: 'test',
      }],
      next: '/api/episodes/?page=2',
      previous: null,
    },
  });

  expect(state.loading).toEqual(false);
  expect(state.results.length).toEqual(1);
  expect(state.next).toEqual(2);
  expect(state.previous).toEqual(0);
});
