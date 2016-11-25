import { takeEvery } from 'redux-saga';
import { select, fork } from 'redux-saga/effects';

import { START_PLAYER } from '../../actionTypes';

import * as api from '../../api';

const isAuthenticated = state => state.auth.authenticated;

function* startPlayer({ payload }) {
  const authenticated = yield select(isAuthenticated);
  if (authenticated) {
    yield fork(api.history.add, payload.id);
  }
}

export default function* watch() {
  yield takeEvery(START_PLAYER, startPlayer);
}
