import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  FETCH_EPISODES_FAILURE,
  FETCH_EPISODES_REQUEST,
  FETCH_EPISODES_SUCCESS,
} from '../action-types';

import {
  fetchAllEpisodes,
  fetchBookmarkedEpisodes,
  fetchSubscribedEpisodes,
} from './episodes';

jest.mock('../api');

const createMockStore = configureMockStore([thunk]);

const mockPayload = {
  results: [{
    id: 1,
    title: 'test',
  }],
  previous: null,
  next: '/api/episodes/?page=2',
  count: 10,
};


describe('fetchAllEpisodes', () => {

  it('should fetch all episodes', () => {

    const api = require('../api');

    api.episodes.fetchAll.mockImplementation(() => {
      return new Promise(resolve => {
        resolve(mockPayload);
      });
    });

    const store = createMockStore();

    return store
      .dispatch(fetchAllEpisodes(1, 'test'))
      .then(() => {
        expect(api.episodes.fetchAll).toBeCalledWith(1, 'test');
        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(FETCH_EPISODES_REQUEST);
        expect(actions[1].type).toBe(FETCH_EPISODES_SUCCESS);
        expect(actions[1].payload).toBe(mockPayload);
      });

  });

  it('should handle error', () => {

    const error = new Error('Whoops');

    const api = require('../api');

    api.episodes.fetchAll.mockImplementation(() => {
      return new Promise(() => {
        throw error;
      });
    });

    const store = createMockStore();

    return store
      .dispatch(fetchAllEpisodes(1, 'test'))
      .then(() => {
        expect(api.episodes.fetchAll).toBeCalledWith(1, 'test');
        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(FETCH_EPISODES_REQUEST);
        expect(actions[1].type).toBe(FETCH_EPISODES_FAILURE);
        expect(actions[1].error).toBe(error);
      });
  });
});

describe('fetchBookmarkedEpisodes', () => {

  it('should fetch all episodes', () => {

    const api = require('../api');

    api.episodes.fetchBookmarked.mockImplementation(() => {
      return new Promise(resolve => {
        resolve(mockPayload);
      });
    });

    const store = createMockStore();

    return store
      .dispatch(fetchBookmarkedEpisodes(1, 'test'))
      .then(() => {
        expect(api.episodes.fetchBookmarked).toBeCalledWith(1, 'test');
        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(FETCH_EPISODES_REQUEST);
        expect(actions[1].type).toBe(FETCH_EPISODES_SUCCESS);
        expect(actions[1].payload).toBe(mockPayload);
      });

  });

  it('should handle error', () => {

    const error = new Error('Whoops');

    const api = require('../api');

    api.episodes.fetchBookmarked.mockImplementation(() => {
      return new Promise(() => {
        throw error;
      });
    });

    const store = createMockStore();

    return store
      .dispatch(fetchBookmarkedEpisodes(1, 'test'))
      .then(() => {
        expect(api.episodes.fetchBookmarked).toBeCalledWith(1, 'test');
        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(FETCH_EPISODES_REQUEST);
        expect(actions[1].type).toBe(FETCH_EPISODES_FAILURE);
        expect(actions[1].error).toBe(error);
      });
  });
});


describe('fetchSubscribedEpisodes', () => {

  it('should fetch all episodes', () => {

    const api = require('../api');

    api.episodes.fetchSubscribed.mockImplementation(() => {
      return new Promise(resolve => {
        resolve(mockPayload);
      });
    });

    const store = createMockStore();

    return store
      .dispatch(fetchSubscribedEpisodes(1, 'test'))
      .then(() => {
        expect(api.episodes.fetchSubscribed).toBeCalledWith(1, 'test');
        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(FETCH_EPISODES_REQUEST);
        expect(actions[1].type).toBe(FETCH_EPISODES_SUCCESS);
        expect(actions[1].payload).toBe(mockPayload);
      });

  });

  it('should handle error', () => {

    const error = new Error('Whoops');

    const api = require('../api');

    api.episodes.fetchSubscribed.mockImplementation(() => {
      return new Promise(() => {
        throw error;
      });
    });

    const store = createMockStore();

    return store
      .dispatch(fetchSubscribedEpisodes(1, 'test'))
      .then(() => {
        expect(api.episodes.fetchSubscribed).toBeCalledWith(1, 'test');
        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(FETCH_EPISODES_REQUEST);
        expect(actions[1].type).toBe(FETCH_EPISODES_FAILURE);
        expect(actions[1].error).toBe(error);
      });
  });
});
