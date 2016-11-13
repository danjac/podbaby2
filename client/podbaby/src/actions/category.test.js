import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  FETCH_CATEGORY_FAILURE,
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CHANNELS_FAILURE,
  FETCH_CHANNELS_REQUEST,
  FETCH_CHANNELS_SUCCESS,
} from '../actionTypes';


import { fetchCategory, fetchChannelsForCategory } from './category';

jest.mock('../api');


const createMockStore = configureMockStore([thunk]);


describe('fetchCategory', () => {

  const api = require('../api');

  beforeEach(() => {
    api.categories.get.mockClear();
  });

  it('should fetch an episode', () => {

    const channel = {
      id: 1,
    };

    api.categories.get.mockImplementation(() => {
      return new Promise(resolve => resolve(channel));
    });

    const store = createMockStore();
    return store
      .dispatch(fetchCategory(1))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(FETCH_CATEGORY_REQUEST);
        expect(actions[1].type).toBe(FETCH_CATEGORY_SUCCESS);
        expect(actions[1].payload).toBe(channel);
        expect(api.categories.get).toBeCalledWith(1);
      });
  });

  it('should handle an error', () => {

    const error = new Error('Channel not found');

    api.categories.get.mockImplementation(() => {
      return new Promise(resolve => {
        throw error;
      });
    });

    const store = createMockStore();
    return store
      .dispatch(fetchCategory(1))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(FETCH_CATEGORY_REQUEST);
        expect(actions[1].type).toBe(FETCH_CATEGORY_FAILURE);
        expect(actions[1].error).toBe(error);
        expect(api.categories.get).toBeCalledWith(1);
      });
  });
});


describe('fetchChannelsForCategory', () => {
  const api = require('../api');

  beforeEach(() => {
    api.categories.fetchChannels.mockClear();
  });

  it('should fetch all channels for a category', () => {

    const mockPayload = {
      results: [{
        id: 1,
        name: 'test',
      }],
      previous: null,
      next: '/api/channels/?page=2',
      count: 10,
    };



    api.categories.fetchChannels.mockImplementation(() => {
      return new Promise(resolve => {
        resolve(mockPayload);
      });
    });

    const store = createMockStore();

    return store
      .dispatch(fetchChannelsForCategory(1, 1, 'test'))
      .then(() => {
        expect(api.categories.fetchChannels).toBeCalledWith(1, 1, 'test');
        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(FETCH_CHANNELS_REQUEST);
        expect(actions[1].type).toBe(FETCH_CHANNELS_SUCCESS);
        expect(actions[1].payload).toBe(mockPayload);
      });

  });

  it('should handle error', () => {

    const error = new Error('Whoops');

    api.categories.fetchChannels.mockImplementation(() => {
      return new Promise(() => {
        throw error;
      });
    });

    const store = createMockStore();

    return store
      .dispatch(fetchChannelsForCategory(1, 1, 'test'))
      .then(() => {
        expect(api.categories.fetchChannels).toBeCalledWith(1, 1, 'test');
        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(FETCH_CHANNELS_REQUEST);
        expect(actions[1].type).toBe(FETCH_CHANNELS_FAILURE);
        expect(actions[1].error).toBe(error);
      });
  });
});
