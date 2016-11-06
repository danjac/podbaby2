import {
  ADD_BOOKMARK,
  REMOVE_BOOKMARK,
  FETCH_USER_SUCCESS,
  LOGOUT,
} from '../actionTypes';

import reducer from './bookmarks';

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
      bookmarks: [1, 2, ],
    },
  });
  expect(state).toEqual([1, 2, ]);
});

it('should handle ADD_BOOKMARK', () => {
  const state = reducer([1, ], {
    type: ADD_BOOKMARK,
    payload: 2,
  });
  expect(state).toContain(1);
  expect(state).toContain(2);
});

it('should handle REMOVE_BOOKMARK', () => {
  const state = reducer([1, 2, ], {
    type: REMOVE_BOOKMARK,
    payload: 2,
  });
  expect(state).toContain(1);
  expect(state).not.toContain(2);
});
