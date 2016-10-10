import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer, {
  fetchEpisode,
  FETCH_EPISODE,
} from './episode';

jest.mock('../utils/storage');
jest.mock('../utils/api');

const mockStore = configureMockStore([thunk]);

it('Should fetch an existing episode', () => {

  const store = mockStore();

  return store
  .dispatch(fetchEpisode(1))
  .then(() => {
    const actions = store.getActions();
    expect(actions.length).toBe(2);
    expect(actions[1].payload.id).toBe(1);
  });
});


it('Should set state to loading', () => {
  const state = { isLoading: false };
  const newState = reducer(state, { type: FETCH_EPISODE });
  expect(newState.isLoading).toBeTruthy();
});
