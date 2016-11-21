import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  FETCH_EPISODES_FAILURE,
  FETCH_EPISODES_REQUEST,
  FETCH_EPISODES_SUCCESS,
} from '../../actionTypes';

import {
  fetchAllEpisodes,
  fetchBookmarkedEpisodes,
  fetchSubscribedEpisodes,
} from './index';

jest.mock('../../api');

const createMockStore = configureMockStore([thunk]);

const mockPayload = {
  results: [{
    id: 1,
    title: 'test',
  }],
  previous: null,
  next:'/api/episodes/?page=2',
  count: 10,
};


describe('fetchAllEpisodes', () => {

  const api = require('../../api');

  beforeEach(() => {
    api.episodes.fetchAll.mockClear();
  });

  it('should fetch all episodes', () => {

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

  const api = require('../../api');

  beforeEach(() => {
    api.episodes.fetchBookmarked.mockClear();
  });


  it('should fetch all episodes', () => {

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
  const api = require('../../api');

  beforeEach(() => {
    api.episodes.fetchSubscribed.mockClear();
  });

  it('should fetch all episodes', () => {

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
