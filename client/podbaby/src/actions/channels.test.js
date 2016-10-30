import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  FETCH_CHANNELS_FAILURE,
  FETCH_CHANNELS_REQUEST,
  FETCH_CHANNELS_SUCCESS,
} from '../action-types';

import {
  fetchAllChannels,
  fetchSubscribedChannels,
} from './channels';

jest.mock('../api');

const createMockStore = configureMockStore([thunk]);

const mockPayload = {
  results: [{
    id: 1,
    name: 'test',
  }],
  previous: null,
  next: '/api/channels/?page=2',
  count: 10,
};


describe('fetchAllChannels', () => {

  const api = require('../api');

  beforeEach(() => {
    api.channels.fetchAll.mockClear();
  });

  it('should fetch all channels', () => {

    api.channels.fetchAll.mockImplementation(() => {
      return new Promise(resolve => {
        resolve(mockPayload);
      });
    });

    const store = createMockStore();

    return store
      .dispatch(fetchAllChannels(1, 'test'))
      .then(() => {
        expect(api.channels.fetchAll).toBeCalledWith(1, 'test');
        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(FETCH_CHANNELS_REQUEST);
        expect(actions[1].type).toBe(FETCH_CHANNELS_SUCCESS);
        expect(actions[1].payload).toBe(mockPayload);
      });

  });

  it('should handle error', () => {

    const error = new Error('Whoops');

    api.channels.fetchAll.mockImplementation(() => {
      return new Promise(() => {
        throw error;
      });
    });

    const store = createMockStore();

    return store
      .dispatch(fetchAllChannels(1, 'test'))
      .then(() => {
        expect(api.channels.fetchAll).toBeCalledWith(1, 'test');
        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(FETCH_CHANNELS_REQUEST);
        expect(actions[1].type).toBe(FETCH_CHANNELS_FAILURE);
        expect(actions[1].error).toBe(error);
      });
  });
});

describe('fetchSubscribedchannels', () => {
  const api = require('../api');

  beforeEach(() => {
    api.channels.fetchSubscribed.mockClear();
  });

  it('should fetch all channels', () => {

    api.channels.fetchSubscribed.mockImplementation(() => {
      return new Promise(resolve => {
        resolve(mockPayload);
      });
    });

    const store = createMockStore();

    return store
      .dispatch(fetchSubscribedChannels(1, 'test'))
      .then(() => {
        expect(api.channels.fetchSubscribed).toBeCalledWith(1, 'test');
        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(FETCH_CHANNELS_REQUEST);
        expect(actions[1].type).toBe(FETCH_CHANNELS_SUCCESS);
        expect(actions[1].payload).toBe(mockPayload);
      });

  });

  it('should handle error', () => {

    const error = new Error('Whoops');

    api.channels.fetchSubscribed.mockImplementation(() => {
      return new Promise(() => {
        throw error;
      });
    });

    const store = createMockStore();

    return store
      .dispatch(fetchSubscribedChannels(1, 'test'))
      .then(() => {
        expect(api.channels.fetchSubscribed).toBeCalledWith(1, 'test');
        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(FETCH_CHANNELS_REQUEST);
        expect(actions[1].type).toBe(FETCH_CHANNELS_FAILURE);
        expect(actions[1].error).toBe(error);
      });
  });
});
