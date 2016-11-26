import {
  FETCH_CHANNEL_REQUEST,
  FETCH_CHANNEL_EPISODES_REQUEST,
} from '../../actionTypes';


import { fetchChannel, fetchEpisodesForChannel } from './channel';


describe('fetchChannel', () => {

  it('should request a channel', () => {

    const action = fetchChannel(1);
    expect(action.type).toEqual(FETCH_CHANNEL_REQUEST);
    expect(action.payload.id).toEqual(1);
  });

});


describe('fetchEpisodesForChannel', () => {

  it('should request all episodes for a channel', () => {

    const action = fetchEpisodesForChannel(1, 1, 'test');

    expect(action.type).toEqual(FETCH_CHANNEL_EPISODES_REQUEST);
    expect(action.payload.id).toEqual(1);
    expect(action.payload.page).toEqual(1);
    expect(action.payload.searchQuery).toEqual('test');
  });

});
