import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  FETCH_EPISODE_FAILURE,
  FETCH_EPISODE_REQUEST,
  FETCH_EPISODE_SUCCESS,
} from '../action-types';


import { fetchEpisode } from './episode';


jest.mock('../api');


const createMockStore = configureMockStore([thunk]);


describe('fetchEpisode', () => {

  const api = require('../api');

  beforeEach(() => {
    api.episodes.get.mockClear();
  });

  it('should fetch an episode', () => {

    const episode = {
      id: 1,
    };

    api.episodes.get.mockImplementation(() => {
      return new Promise(resolve => resolve(episode));
    });

    const store = createMockStore();
    return store
      .dispatch(fetchEpisode(1))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(FETCH_EPISODE_REQUEST);
        expect(actions[1].type).toBe(FETCH_EPISODE_SUCCESS);
        expect(actions[1].payload).toBe(episode);
        expect(api.episodes.get).toBeCalledWith(1);
      });
  });

  it('should handle an error', () => {

    const error = new Error('Episode not found');

    api.episodes.get.mockImplementation(() => {
      return new Promise(resolve => {
        throw error;
      });
    });

    const store = createMockStore();
    return store
      .dispatch(fetchEpisode(1))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(FETCH_EPISODE_REQUEST);
        expect(actions[1].type).toBe(FETCH_EPISODE_FAILURE);
        expect(actions[1].error).toBe(error);
        expect(api.episodes.get).toBeCalledWith(1);
      });
  });
});
