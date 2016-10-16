import { createSelector } from 'reselect';

export const currentUserSelector = state => state.auth.currentUser;

export const bookmarksSelector = createSelector(
  currentUserSelector,
  currentUser => {
    return currentUser ? currentUser.bookmarks : [];
  }
);

export const subscriptionsSelector = createSelector(
  currentUserSelector,
  currentUser => {
    return currentUser ? currentUser.subscriptions : [];
  }
);


