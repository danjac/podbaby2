import {
  ADD_BOOKMARK,
  REMOVE_BOOKMARK,
} from '../action-types';

import {
  addBookmark,
  removeBookmark,
} from './bookmarks';

jest.mock('../api');

it('should add a bookmark', () => {
  const episode = { id: 1 };
  const action = addBookmark(episode);
  expect(action.type).toEqual(ADD_BOOKMARK);
  expect(action.payload).toEqual(episode);
  const api = require('../api');
  expect(api.bookmarks.add).toBeCalledWith(1);
});

it('should remove a bookmark', () => {
  const episode = { id: 1 };
  const action = removeBookmark(episode);
  expect(action.type).toEqual(REMOVE_BOOKMARK);
  expect(action.payload).toEqual(episode);
  const api = require('../api');
  expect(api.bookmarks.remove).toBeCalledWith(1);
});
