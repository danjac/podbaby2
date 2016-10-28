import * as api from '../api';

import {
  ADD_BOOKMARK,
  REMOVE_BOOKMARK,
} from '../action-types';

export const addBookmark = episode => {
  api.bookmarks.add(episode.id);
  return { type: ADD_BOOKMARK, payload: episode };
};

export const removeBookmark = episode => {
  api.bookmarks.remove(episode.id);
  return { type: REMOVE_BOOKMARK, payload: episode };
};
