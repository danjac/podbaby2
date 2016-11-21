import { SUBSCRIBE, UNSUBSCRIBE } from '../../actionTypes';

import { subscribe, unsubscribe } from './index';

jest.mock('../../api');

describe('subscribe', () => {

  const api = require('../../api');

  it('should create a subscription', () => {
    const channel = { id: 1 };
    const action = subscribe(channel);
    expect(action.type).toBe(SUBSCRIBE);
    expect(action.payload).toBe(1);
    expect(api.subscriptions.subscribe).toBeCalledWith(1);
  });

});

describe('unsubscribe', () => {

  const api = require('../../api');

  it('should remove a subscription', () => {
    const channel = { id: 1 };
    const action = unsubscribe(channel);
    expect(action.type).toBe(UNSUBSCRIBE);
    expect(action.payload).toBe(1);
    expect(api.subscriptions.unsubscribe).toBeCalledWith(1);
  });

});
