import {
  FETCH_CATEGORY_FAILURE,
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
} from '../actionTypes';

import reducer from './category';

it('should handle FETCH_CATEGORY_REQUEST', () => {
  const state = reducer({
    loading: false,
  }, {
    type: FETCH_CATEGORY_REQUEST,
  });

  expect(state.loading).toEqual(true);

});

it('should handle FETCH_CATEGORY_FAILURE', () => {
  const error = new Error('No category found');

  const state = reducer({
    loading: true,
    category: null,
    error: null,
  }, {
    type: FETCH_CATEGORY_FAILURE,
    error,
  });

  expect(state.loading).toEqual(false);
  expect(state.category).toEqual(null);
  expect(state.error).toEqual(error);
});


it('should handle FETCH_CATEGORY_SUCCESS', () => {
  const state = reducer({
    loading: true,
    category: null,
  }, {
    type: FETCH_CATEGORY_SUCCESS,
    payload: {
      id: 1,
    },
  });

  expect(state.loading).toEqual(false);
  expect(state.category.id).toEqual(1);

});
