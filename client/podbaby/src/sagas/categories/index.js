import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from '../../actionTypes';

import * as api from '../../api';

function* fetchCategories() {
  try {
    const payload = yield call(api.categories.fetchAll);
    yield put({
      type: FETCH_CATEGORIES_SUCCESS,
      payload,
    });
  } catch (error) {
    yield put({
      type: FETCH_CATEGORIES_FAILURE,
      error,
    });
  }
}

export default function* watch() {
  yield takeLatest(FETCH_CATEGORIES_REQUEST, fetchCategories);
}
