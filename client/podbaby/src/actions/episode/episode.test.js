import { FETCH_EPISODE_REQUEST } from '../../actionTypes';

import { fetchEpisode } from './episode';

describe('fetchEpisode', () => {
  it('should request an episode', () => {
    const action = fetchEpisode(1);
    expect(action.type).toEqual(FETCH_EPISODE_REQUEST);
    expect(action.payload.id).toEqual(1);
  });
});
