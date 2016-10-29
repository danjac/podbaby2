import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from '../action-types';

import reducer from './categories';

it('should handle FETCH_CATEGORIES_REQUEST', () => {

  const state = reducer({
    loading: false,
  }, {
    type: FETCH_CATEGORIES_REQUEST,
  });

  expect(state.loading).toEqual(true);

});

it('should handle FETCH_CATEGORIES_SUCCESS', () => {

  const state = reducer({
    loading: true,
    categories: [],
  }, {
    type: FETCH_CATEGORIES_SUCCESS,
    payload: [{
      id: 1,
      name: 'Comedy',
    }, ],
  });

  expect(state.loading).toEqual(false);
  expect(state.categories.length).toEqual(1);
});

it('should handle FETCH_CATEGORIES_FAILURE', () => {

  const error = new Error('Whoops');

  const state = reducer({
    loading: true,
    error: null,
  }, {
    type: FETCH_CATEGORIES_FAILURE,
    error,
  });

  expect(state.loading).toEqual(false);
  expect(state.error).toEqual(error);

});
