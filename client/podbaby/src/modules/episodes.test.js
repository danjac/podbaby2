import nock from 'nock';
import { fetchEpisodes } from './episodes';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

jest.mock('../utils/storage');
jest.mock('../utils/api');

const mockStore = configureMockStore([thunk]);

it('should return a payload with a valid URL', () => {

  const store = mockStore();

  store.dispatch(fetchEpisodes('/api/episodes/'))
    .then(() => {
      const actions = store.getActions();
      expect(actions.length).toBe(2);
      expect(actions[0].payload.isLoading).toBe(true);
      expect(actions[1].payload.results.length).toBe(1);
      expect(actions[1].payload.isLoading).toBe(false);
    });

});
