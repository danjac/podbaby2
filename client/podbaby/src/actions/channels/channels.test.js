import {
  FETCH_ALL_CHANNELS_REQUEST,
  FETCH_SUBSCRIBED_CHANNELS_REQUEST,
} from '../../actionTypes';

import {
  fetchAllChannels,
  fetchSubscribedChannels,
} from './channels';


describe('fetchAllChannels', () => {

  it('should request all channels', () => {

    const action = fetchAllChannels(1, 'test');
    expect(action.type).toEqual(FETCH_ALL_CHANNELS_REQUEST);
    expect(action.payload.page).toEqual(1);
    expect(action.payload.searchQuery).toEqual('test');
  });

});

describe('fetchSubscribedChannels', () => {

  it('should request subscribed channels', () => {

    const action = fetchSubscribedChannels(1, 'test');
    expect(action.type).toEqual(FETCH_SUBSCRIBED_CHANNELS_REQUEST);
    expect(action.payload.page).toEqual(1);
    expect(action.payload.searchQuery).toEqual('test');

  });

});
