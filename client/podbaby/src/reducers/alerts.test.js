import {
  ADD_ALERT,
  REMOVE_ALERT,
} from '../action-types';

import reducer from './alerts';

it('should REMOVE_ALERT', () => {
  const state = reducer([{
    id: 1,
  }, {
    id: 2,
  }, ], {
    type: REMOVE_ALERT,
    payload: 2,
  }, );

  expect(state.length).toEqual(1);
  expect(state[0].id).toEqual(1);

});

it('should ADD_ALERT', () => {

  const state = reducer([], {
    type: ADD_ALERT,
    payload: {
      id: 1,
      type: 'success',
      message: 'It works!',
    },
  });

  expect(state.length).toEqual(1);

});
