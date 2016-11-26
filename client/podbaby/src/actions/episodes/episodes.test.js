import {
  FETCH_ALL_EPISODES_REQUEST,
  FETCH_SUBSCRIBED_EPISODES_REQUEST,
  FETCH_BOOKMARKED_EPISODES_REQUEST,
  FETCH_PLAYED_EPISODES_REQUEST,
} from '../../actionTypes';

import {
  fetchAllEpisodes,
  fetchBookmarkedEpisodes,
  fetchSubscribedEpisodes,
  fetchPlayedEpisodes,
} from './index';


describe('fetchAllEpisodes', () => {

  it('should request all episodes', () => {

    const action = fetchAllEpisodes(1, 'test');
    expect(action.type).toEqual(FETCH_ALL_EPISODES_REQUEST);
    expect(action.payload.page).toEqual(1);
    expect(action.payload.searchQuery).toEqual('test');

  });

});

describe('fetchSubscribedEpisodes', () => {

  it('should request subscribed episodes', () => {

    const action = fetchSubscribedEpisodes(1, 'test');
    expect(action.type).toEqual(FETCH_SUBSCRIBED_EPISODES_REQUEST);
    expect(action.payload.page).toEqual(1);
    expect(action.payload.searchQuery).toEqual('test');

  });

});

describe('fetchBookmarkedEpisodes', () => {

  it('should request bookmarked episodes', () => {

    const action = fetchBookmarkedEpisodes(1, 'test');
    expect(action.type).toEqual(FETCH_BOOKMARKED_EPISODES_REQUEST);
    expect(action.payload.page).toEqual(1);
    expect(action.payload.searchQuery).toEqual('test');

  });

});

describe('fetchPlayedEpisodes', () => {

  it('should request played episodes', () => {

    const action = fetchPlayedEpisodes(1, 'test');
    expect(action.type).toEqual(FETCH_PLAYED_EPISODES_REQUEST);
    expect(action.payload.page).toEqual(1);
    expect(action.payload.searchQuery).toEqual('test');
  });

});
