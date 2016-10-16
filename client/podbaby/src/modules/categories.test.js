import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer, {
  fetchCategories,
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from './categories';

jest.mock('../utils/storage');
jest.mock('../utils/api');

const mockStore = configureMockStore([thunk]);

it('Should fetch a list of categories', () => {

  const store = mockStore();

  return store
  .dispatch(fetchCategories())
    .then(() => {
      const actions = store.getActions();
      expect(actions.length).toBe(2);
      expect(actions[1].payload.length).toBe(3);
    });
});

it('Should set state to loading', () => {
  const state = { isLoading: false };
  const newState = reducer(state, { type: FETCH_CATEGORIES });
  expect(newState.isLoading).toBeTruthy();
});

it('Should add categories to state', () => {
  const state = { isLoading: true };
  const payload = [
    {
      id: 1,
      name: 'Comedy',
    },
  ];
  const newState = reducer(
    state, {
      type: FETCH_CATEGORIES_SUCCESS,
      payload
    });
  expect(newState.isLoading).toBeFalsy();
  expect(newState.results).toEqual(payload);
});

it('Should fail', () => {
  const state = { isLoading: true };
  const newState = reducer(
    state, {
      type: FETCH_CATEGORIES_FAILURE,
      error: new Error(),
    });
  expect(newState.isLoading).toBeFalsy();
  expect(newState.results).toEqual([]);
});

