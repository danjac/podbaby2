import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { partial } from 'lodash';

import {
  FETCH_EPISODES_FAILURE,
  FETCH_EPISODES_SUCCESS,
  FETCH_EPISODES_REQUEST,
  FETCH_ALL_EPISODES_REQUEST,
  FETCH_SUBSCRIBED_EPISODES_REQUEST,
  FETCH_BOOKMARKED_EPISODES_REQUEST,
  FETCH_PLAYED_EPISODES_REQUEST,
} from '../../actionTypes';

import * as api from '../../api';

export function* fetch(apiCall, {
  payload: {
    page,
    searchQuery,
  },
}) {

  yield put({ type: FETCH_EPISODES_REQUEST });

  try {
    const payload = yield call(apiCall, page, searchQuery);
    yield put({
      type: FETCH_EPISODES_SUCCESS,
      payload,
    });
  } catch (error) {
    yield put({
      type: FETCH_EPISODES_FAILURE,
      error,
    });
  }
}

const fetchAll = partial(fetch, api.episodes.fetchAll);
const fetchBookmarked = partial(fetch, api.episodes.fetchBookmarked);
const fetchSubscribed = partial(fetch, api.episodes.fetchSubscribed);
const fetchPlayed = partial(fetch, api.episodes.fetchPlayed);

export default function* watch() {
  yield takeLatest(FETCH_ALL_EPISODES_REQUEST, fetchAll);
  yield takeLatest(FETCH_BOOKMARKED_EPISODES_REQUEST, fetchBookmarked);
  yield takeLatest(FETCH_SUBSCRIBED_EPISODES_REQUEST, fetchSubscribed);
  yield takeLatest(FETCH_PLAYED_EPISODES_REQUEST, fetchPlayed);
}
