import {
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_CHANNELS_REQUEST,
} from '../../actionTypes';


import { fetchCategory, fetchChannelsForCategory } from './category';



describe('fetchCategory', () => {

  it('should request a category', () => {

    const action = fetchCategory(1);
    expect(action.type).toEqual(FETCH_CATEGORY_REQUEST);
    expect(action.payload.id).toEqual(1);
  });

});


describe('fetchChannelsForCategory', () => {

  it('should request channels for a category', () => {

    const action = fetchChannelsForCategory(1, 1, 'test');

    expect(action.type).toEqual(FETCH_CATEGORY_CHANNELS_REQUEST);
    expect(action.payload.id).toEqual(1);
    expect(action.payload.page).toEqual(1);
    expect(action.payload.searchQuery).toEqual('test');

  });
});
