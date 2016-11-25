import {
  FETCH_EPISODES_REQUEST,
  FETCH_EPISODES_SUCCESS,
  FETCH_EPISODES_FAILURE,
} from '../../actionTypes';

import * as api from '../../api';

import { fetchAll } from './episodes';

describe('fetchAll success', () => {

  const generator = fetchAll({
    payload: {
      page: 1,
      searchQuery: "",
    },
  });

  it('should request episodes', () => {
    let next = generator.next();
    expect(next.value.PUT.action.type).toEqual(FETCH_EPISODES_REQUEST);
  });

  it('should fetch all episodes', () => {
    let next = generator.next(api.episodes.fetchAll, 1, "");
    next = generator.next({ episodes: [{ id: 1 }] });
    const { action } = next.value.PUT;
    expect(action.type).toEqual(FETCH_EPISODES_SUCCESS);
    expect(action.payload.episodes.length).toEqual(1);
  });
});

describe('fetchAll failure', () => {

  const generator = fetchAll({
    payload: {
      page: 1,
      searchQuery: "",
    },
  });

  const err = new Error('call failed');

  const failedApiCall = (page, searchQuery) => {
    throw err;
  };

  it('should request episodes', () => {
    let next = generator.next();
    expect(next.value.PUT.action.type).toEqual(FETCH_EPISODES_REQUEST);
  });

  it('should fetch all episodes with failure', () => {
    let next = generator.next(failedApiCall, 1, "");
    next = generator.throw(err);
    const { action } = next.value.PUT;
    expect(action.type).toEqual(FETCH_EPISODES_FAILURE);
    expect(action.error).toEqual(err);
  });
});
