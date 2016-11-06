import * as api from '../api';
import { ADD_BOOKMARK, REMOVE_BOOKMARK } from '../action-types';

import { createAction } from './utils';

// tbd: add alert msgs
export const addBookmark = episode => {
  api.bookmarks.add(episode.id);
  return createAction(ADD_BOOKMARK, episode.id);
};

export const removeBookmark = episode => {
  api.bookmarks.remove(episode.id);
  return createAction(REMOVE_BOOKMARK, episode.id);
};
