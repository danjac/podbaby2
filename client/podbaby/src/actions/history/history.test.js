import { CLEAR_HISTORY } from '../../actionTypes';

import { clearHistory } from './history';

it('should clear history', () => {
  const action = clearHistory();
  expect(action.type).toBe(CLEAR_HISTORY);
});
