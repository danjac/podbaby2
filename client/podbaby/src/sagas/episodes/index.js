import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import {
  FETCH_EPISODES_FAILURE,
  FETCH_EPISODES_REQUEST,
  FETCH_EPISODES_SUCCESS,
} from '../../actionTypes';

function* fetch({
  payload: {
    apiCall,
    page,
    searchQuery,
  },
}) {
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

export default function* watch() {
  yield takeLatest(FETCH_EPISODES_REQUEST, fetch);
}
