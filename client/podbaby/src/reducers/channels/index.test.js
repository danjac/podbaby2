import {
  FETCH_CHANNELS_REQUEST,
  FETCH_CHANNELS_SUCCESS,
  FETCH_CHANNELS_FAILURE,
} from '../../actionTypes';

import reducer from './index';

it('should handle FETCH_CHANNELS_REQUEST', () => {

  const state = reducer({
    loading: false,
  }, {
    type: FETCH_CHANNELS_REQUEST,
  });

  expect(state.loading).toEqual(true);
});

it('should handle FETCH_CHANNELS_FAILURE', () => {

  const error = new Error('Whoops');

  const state = reducer({
    loading: true,
  }, {
    type: FETCH_CHANNELS_FAILURE,
    error,
  });

  expect(state.loading).toEqual(false);
  expect(state.error).toEqual(error);

});

it('should handle FETCH_CHANNELS_SUCCESS', () => {

  const state = reducer({
    loading: true,
    results: [],
    next: 0,
    previous: 0,
  }, {
    type: FETCH_CHANNELS_SUCCESS,
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
