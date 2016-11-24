import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  LOGOUT,
} from '../../actionTypes';

import * as api from '../../api';
import { success, info } from '../../actions/alerts';

export function* fetchUser(action) {

  const isNew = action.payload && action.payload.isNew;

  try {
    const user = yield call(api.auth.getUser);
    yield put({
      type: FETCH_USER_SUCCESS,
      payload: user,
    });
    if (isNew) {
      yield put(success(`Welcome, ${user.username}`));
    }
  } catch (error) {
    yield put({
      type: FETCH_USER_FAILURE,
      error,
    });
  }
}

function* logout() {
  yield put(info('Bye bye!'));
}

export default function* watch() {
  yield takeLatest(LOGOUT, logout);
  yield takeLatest(FETCH_USER_REQUEST, fetchUser);
}
