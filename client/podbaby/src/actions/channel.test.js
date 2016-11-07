import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  FETCH_CHANNEL_FAILURE,
  FETCH_CHANNEL_REQUEST,
  FETCH_CHANNEL_SUCCESS,
} from '../actionTypes';


import { fetchChannel } from './channel';


jest.mock('../api');


const createMockStore = configureMockStore([thunk]);


describe('fetchChannel', () => {

  const api = require('../api');

  beforeEach(() => {
    api.channels.get.mockClear();
  });

  it('should fetch an episode', () => {

    const episode = {
      id: 1,
    };

    api.channels.get.mockImplementation(() => {
      return new Promise(resolve => resolve(episode));
    });

    const store = createMockStore();
    return store
      .dispatch(fetchChannel(1))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(FETCH_CHANNEL_REQUEST);
        expect(actions[1].type).toBe(FETCH_CHANNEL_SUCCESS);
        expect(actions[1].payload).toBe(episode);
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
