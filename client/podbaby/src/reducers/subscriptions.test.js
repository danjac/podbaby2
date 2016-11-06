import {
  SUBSCRIBE,
  UNSUBSCRIBE,
  FETCH_USER_SUCCESS,
  LOGOUT,
} from '../actionTypes';

import reducer from './subscriptions';

it('should handle LOGOUT', () => {
  const state = reducer([1, 2, ], {
    type: LOGOUT,
  });

  expect(state).toEqual([]);

});

it('should handle FETCH_USER_SUCCESS', () => {
  const state = reducer([], {
    type: FETCH_USER_SUCCESS,
    payload: {
      name: 'test',
      subscriptions: [1, 2, ],
    },
  });
  expect(state).toEqual([1, 2, ]);
});

it('should handle SUBSCRIBE', () => {
  const state = reducer([1, ], {
    type: SUBSCRIBE,
    payload: 2,
  });
  expect(state).toContain(1);
  expect(state).toContain(2);
});

it('should handle UNSUBSCRIBE', () => {
  const state = reducer([1, 2, ], {
    type: UNSUBSCRIBE,
    payload: 2,
  });
  expect(state).toContain(1);
  expect(state).not.toContain(2);
});
