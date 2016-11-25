import { ADD_BOOKMARK, REMOVE_BOOKMARK } from '../../actionTypes';

export const addBookmark = episode => ({
  type: ADD_BOOKMARK,
  payload: episode,
});

export const removeBookmark = episode => ({
  type: REMOVE_BOOKMARK,
  payload: episode,
});
