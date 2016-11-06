import {
  FETCH_CHANNEL_FAILURE,
  FETCH_CHANNEL_REQUEST,
  FETCH_CHANNEL_SUCCESS,
} from '../actionTypes';

import reducer from './channel';

it('should handle FETCH_CHANNEL_REQUEST', () => {
  const state = reducer({
    loading: false,
  }, {
    type: FETCH_CHANNEL_REQUEST,
  });

  expect(state.loading).toEqual(true);

});

it('should handle FETCH_CHANNEL_FAILURE', () => {
  const error = new Error('No channel found');

  const state = reducer({
    loading: true,
    channel: null,
    error: null,
  }, {
    type: FETCH_CHANNEL_FAILURE,
    error,
  });

  expect(state.loading).toEqual(false);
  expect(state.channel).toEqual(null);
  expect(state.error).toEqual(error);
});


it('should handle FETCH_CHANNEL_SUCCESS', () => {
  const state = reducer({
    loading: true,
    channel: null,
  }, {
    type: FETCH_CHANNEL_SUCCESS,
    payload: {
      id: 1,
    },
  });

  expect(state.loading).toEqual(false);
  expect(state.channel.id).toEqual(1);

});
