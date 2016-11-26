import { SUBSCRIBE, UNSUBSCRIBE } from '../../actionTypes';

import { subscribe, unsubscribe } from './index';

describe('subscribe', () => {

  it('should create a subscription', () => {
    const channel = { id: 1 };
    const action = subscribe(channel);
    expect(action.type).toBe(SUBSCRIBE);
    expect(action.payload).toBe(channel);
  });

});

describe('unsubscribe', () => {

  it('should remove a subscription', () => {
    const channel = { id: 1 };
    const action = unsubscribe(channel);
    expect(action.type).toBe(UNSUBSCRIBE);
    expect(action.payload).toBe(channel);
  });

});
