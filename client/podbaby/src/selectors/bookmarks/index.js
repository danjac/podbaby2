export const bookmarksSelector = state => state.bookmarks;
export const isBookmarked = (bookmarks, episode) => bookmarks.includes(episode.id);
