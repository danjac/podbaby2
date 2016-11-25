import { call, put } from 'redux-saga/effects';
import { partial } from 'lodash';

import {
  FETCH_EPISODES_FAILURE,
  FETCH_EPISODES_SUCCESS,
  FETCH_EPISODES_REQUEST,
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

export const fetchAll = partial(fetch, api.episodes.fetchAll);
export const fetchBookmarked = partial(fetch, api.episodes.fetchBookmarked);
export const fetchSubscribed = partial(fetch, api.episodes.fetchSubscribed);
export const fetchPlayed = partial(fetch, api.episodes.fetchPlayed);
