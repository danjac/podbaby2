import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { partial } from 'lodash';

import {
  FETCH_CHANNELS_FAILURE,
  FETCH_CHANNELS_SUCCESS,
  FETCH_CHANNELS_REQUEST,
  FETCH_ALL_CHANNELS_REQUEST,
  FETCH_SUBSCRIBED_CHANNELS_REQUEST,
} from '../../actionTypes';


import * as api from '../../api';

export function* fetch(apiCall, {
  payload: {
    page,
    searchQuery,
  },
}) {

  yield put({ type: FETCH_CHANNELS_REQUEST });

  try {
    const payload = yield call(apiCall, page, searchQuery);
    yield put({
      type: FETCH_CHANNELS_SUCCESS,
      payload,
    });
  } catch (error) {
    yield put({
      type: FETCH_CHANNELS_FAILURE,
      error,
    });
  }
}


export const fetchAll = partial(fetch, api.channels.fetchAll);
export const fetchSubscribed = partial(fetch, api.channels.fetchSubscribed);

export default function* watch() {
  yield takeLatest(FETCH_ALL_CHANNELS_REQUEST, fetchAll);
  yield takeLatest(FETCH_SUBSCRIBED_CHANNELS_REQUEST, fetchSubscribed);
}

