import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import {
  FETCH_CATEGORY_FAILURE,
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_CHANNELS_REQUEST,
} from '../../actionTypes';

import * as api from '../../api';

import { fetch } from '../channels';

function* fetchCategory({ payload: { id } }) {
  try {
    const category = yield call(api.categories.get, id);
    yield put({
      type: FETCH_CATEGORY_SUCCESS,
      payload: category,
    });
  } catch (error) {
    yield put({
      type: FETCH_CATEGORY_FAILURE,
      error,
    });
  }
}

function* fetchChannels({ payload, payload: { id, page, searchQuery } }) {
  const apiCall = (page, searchQuery) => api.categories.fetchChannels(
    id,
    page,
    searchQuery,
  );

  yield call(fetch, apiCall, { payload });
}

export default function* watch() {
  yield takeLatest(FETCH_CATEGORY_REQUEST, fetchCategory);
  yield takeLatest(FETCH_CATEGORY_CHANNELS_REQUEST, fetchChannels);
}
