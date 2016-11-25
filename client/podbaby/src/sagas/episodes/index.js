import { takeLatest } from 'redux-saga';

import {
  FETCH_ALL_EPISODES_REQUEST,
  FETCH_SUBSCRIBED_EPISODES_REQUEST,
  FETCH_BOOKMARKED_EPISODES_REQUEST,
  FETCH_PLAYED_EPISODES_REQUEST,
} from '../../actionTypes';

import {
  fetch,
  fetchAll,
  fetchBookmarked,
  fetchSubscribed,
  fetchPlayed,
} from './episodes';

export { fetch };

export default function* watch() {
  yield takeLatest(FETCH_ALL_EPISODES_REQUEST, fetchAll);
  yield takeLatest(FETCH_BOOKMARKED_EPISODES_REQUEST, fetchBookmarked);
  yield takeLatest(FETCH_SUBSCRIBED_EPISODES_REQUEST, fetchSubscribed);
  yield takeLatest(FETCH_PLAYED_EPISODES_REQUEST, fetchPlayed);
}
