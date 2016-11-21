import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  FETCH_CHANNEL_FAILURE,
  FETCH_CHANNEL_REQUEST,
  FETCH_CHANNEL_SUCCESS,
  FETCH_CHANNEL_EPISODES_FAILURE,
  FETCH_CHANNEL_EPISODES_REQUEST,
  FETCH_CHANNEL_EPISODES_SUCCESS,
} from '../../actionTypes';


import { fetchChannel, fetchEpisodesForChannel } from './index';

jest.mock('../../api');


const createMockStore = configureMockStore([thunk]);


describe('fetchChannel', () => {

  const api = require('../../api');

  beforeEach(() => {
    api.channels.get.mockClear();
  });

  it('should fetch an episode', () => {

    const channel = {
      id: 1,
    };

    api.channels.get.mockImplementation(() => {
      return new Promise(resolve => resolve(channel));
    });

    const store = createMockStore();
    return store
      .dispatch(fetchChannel(1))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(FETCH_CHANNEL_REQUEST);
        expect(actions[1].type).toBe(FETCH_CHANNEL_SUCCESS);
        expect(actions[1].payload).toBe(channel);
        expect(api.channels.get).toBeCalledWith(1);
      });
  });

  it('should handle an error', () => {

    const error = new Error('Channel not found');

    api.channels.get.mockImplementation(() => {
      return new Promise(resolve => {
        throw error;
      });
    });

    const store = createMockStore();
    return store
      .dispatch(fetchChannel(1))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(FETCH_CHANNEL_REQUEST);
        expect(actions[1].type).toBe(FETCH_CHANNEL_FAILURE);
        expect(actions[1].error).toBe(error);
        expect(api.channels.get).toBeCalledWith(1);
      });
  });
});


describe('fetchEpisodesForChannel', () => {
  const api = require('../../api');

  beforeEach(() => {
    api.channels.fetchEpisodes.mockClear();
  });

  it('should fetch all episodes for a channel', () => {

    const mockPayload = {
      results: [{
        id: 1,
        title: 'test',
      }],
      previous: null,
      next: '/api/episodes/?page=2',
      count: 10,
    };



    api.channels.fetchEpisodes.mockImplementation(() => {
      return new Promise(resolve => {
        resolve(mockPayload);
      });
    });

    const store = createMockStore();

    return store
      .dispatch(fetchEpisodesForChannel(1, 1, 'test'))
      .then(() => {
        expect(api.channels.fetchEpisodes).toBeCalledWith(1, 1, 'test');
        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(FETCH_CHANNEL_EPISODES_REQUEST);
        expect(actions[1].type).toBe(FETCH_CHANNEL_EPISODES_SUCCESS);
        expect(actions[1].payload).toBe(mockPayload);
      });

  });

  it('should handle error', () => {

    const error = new Error('Whoops');

    api.channels.fetchEpisodes.mockImplementation(() => {
      return new Promise(() => {
        throw error;
      });
    });

    const store = createMockStore();

    return store
      .dispatch(fetchEpisodesForChannel(1, 1, 'test'))
      .then(() => {
        expect(api.channels.fetchEpisodes).toBeCalledWith(1, 1, 'test');
        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(FETCH_CHANNEL_EPISODES_REQUEST);
        expect(actions[1].type).toBe(FETCH_CHANNEL_EPISODES_FAILURE);
        expect(actions[1].error).toBe(error);
      });
  });
});
