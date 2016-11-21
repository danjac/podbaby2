import { ADD_PLAY, CLEAR_HISTORY } from '../../actionTypes';

import { addPlay, clearHistory } from './index';

jest.mock('../../api');

it('should record a play', () => {
  const episode = { id: 1 };
  const action = addPlay(episode);
  expect(action.type).toEqual(ADD_PLAY);
  const api = require('../../api');
  expect(api.history.add).toBeCalledWith(1);
});

it('should clear history', () => {
  const action = clearHistory();
  expect(action.type).toBe(CLEAR_HISTORY);
});
