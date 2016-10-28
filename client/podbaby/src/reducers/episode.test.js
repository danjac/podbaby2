import {
  FETCH_EPISODE_FAILURE,
  FETCH_EPISODE_REQUEST,
  FETCH_EPISODE_SUCCESS,
} from '../action-types';

import reducer from './episode';

it('should handle FETCH_EPISODE_REQUEST', () => {
  const state = reducer({
    loading: false,
  }, {
    type: FETCH_EPISODE_REQUEST,
  });

  expect(state.loading).toEqual(true);

});

it('should handle FETCH_EPISODE_FAILURE', () => {
  const error = new Error('No episode found');

  const state = reducer({
    loading: true,
    episode: null,
    error: null,
  }, {
    type: FETCH_EPISODE_FAILURE,
    error,
  });

  expect(state.loading).toEqual(false);
  expect(state.episode).toEqual(null);
  expect(state.error).toEqual(error);
});


it('should handle FETCH_EPISODE_SUCCESS', () => {
  const state = reducer({
    loading: true,
    episode: null,
  }, {
    type: FETCH_EPISODE_SUCCESS,
    payload: {
      id: 1,
    },
  });

  expect(state.loading).toEqual(false);
  expect(state.episode.id).toEqual(1);

});
