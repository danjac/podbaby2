import { ADD_BOOKMARK, REMOVE_BOOKMARK } from '../../actionTypes';

import { addBookmark, removeBookmark } from './bookmarks';

it('should add a bookmark', () => {
  const episode = { id: 1 };
  const action = addBookmark(episode);
  expect(action.type).toEqual(ADD_BOOKMARK);
  expect(action.payload).toEqual(episode);
});

it('should remove a bookmark', () => {
  const episode = { id: 1 };
  const action = removeBookmark(episode);
  expect(action.type).toEqual(REMOVE_BOOKMARK);
  expect(action.payload).toEqual(episode);
});
