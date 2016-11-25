import {
  CREATE_ALERT,
  DISMISS_ALERT,
} from '../../actionTypes';

import reducer from './alerts';

it('should DISMISS_ALERT', () => {
  const state = reducer([{
    id: 1,
  }, {
    id: 2,
  } ], {
    type: DISMISS_ALERT,
    payload: { id: 2 },
  }, );

  expect(state.length).toEqual(1);
  expect(state[0].id).toEqual(1);

});

it('should CREATE_ALERT', () => {

  const state = reducer([], {
    type: CREATE_ALERT,
    payload: {
      id: 1,
      type: 'success',
      message: 'It works!',
    },
  });

  expect(state.length).toEqual(1);

});
