import { SUBSCRIBE, UNSUBSCRIBE } from '../action-types';

import { subscribe, unsubscribe } from './subscriptions';

jest.mock('../api');

describe('subscribe', () => {

  const api = require('../api');

  it('should create a subscription', () => {
    const channel = { id: 1 };
    const action = subscribe(channel);
    expect(action.type).toBe(SUBSCRIBE);
    expect(action.payload).toBe(channel);
    expect(api.subscriptions.subscribe).toBeCalledWith(channel.id);
  });

});

describe('unsubscribe', () => {

  const api = require('../api');

  it('should remove a subscription', () => {
    const channel = { id: 1 };
    const action = unsubscribe(channel);
    expect(action.type).toBe(UNSUBSCRIBE);
    expect(action.payload).toBe(channel);
    expect(api.subscriptions.unsubscribe).toBeCalledWith(channel.id);
  });

});
