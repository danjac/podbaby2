import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
} from '../action-types';

import {
  fetchCategories,
} from './categories';

jest.mock('../api');

const createMockStore = configureMockStore([thunk]);

const mockPayload = [
  {
    id: 1,
    name: 'test',
  },
];


describe('fetchCategories', () => {

  const api = require('../api');

  beforeEach(() => {
    api.categories.fetchAll.mockClear();
  });

  it('should fetch all channels', () => {

    api.categories.fetchAll.mockImplementation(() => {
      return new Promise(resolve => {
        resolve(mockPayload);
      });
    });

    const store = createMockStore();

    return store
      .dispatch(fetchCategories())
      .then(() => {
        expect(api.categories.fetchAll).toBeCalled();
        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(FETCH_CATEGORIES_REQUEST);
        expect(actions[1].type).toBe(FETCH_CATEGORIES_SUCCESS);
        expect(actions[1].payload).toBe(mockPayload);
      });

  });

  it('should handle error', () => {

    const error = new Error('Whoops');

    api.categories.fetchAll.mockImplementation(() => {
      return new Promise(() => {
        throw error;
      });
    });

    const store = createMockStore();

    return store
      .dispatch(fetchCategories())
      .then(() => {
        expect(api.categories.fetchAll).toBeCalled();
        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(FETCH_CATEGORIES_REQUEST);
        expect(actions[1].type).toBe(FETCH_CATEGORIES_FAILURE);
        expect(actions[1].error).toBe(error);
      });
  });
});
