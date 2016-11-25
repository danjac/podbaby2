import { takeEvery } from 'redux-saga';
import { put, fork } from 'redux-saga/effects';

import { ADD_BOOKMARK, REMOVE_BOOKMARK } from '../../actionTypes';

import * as api from '../../api';

import { success, info } from '../../actions/alerts';

function* addBookmark({ payload }) {
  yield fork(api.bookmarks.add, payload.id);
  yield put(success('You have bookmarked this podcast'));
}

function* removeBookmark({ payload }) {
  yield fork(api.bookmarks.remove, payload.id);
  yield put(info('Bookmark deleted'));
}

export default function* watch() {
  yield takeEvery(ADD_BOOKMARK, addBookmark);
  yield takeEvery(REMOVE_BOOKMARK, removeBookmark);
}
