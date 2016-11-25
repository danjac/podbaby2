import { takeEvery } from 'redux-saga';
import { put, fork } from 'redux-saga/effects';

import { SUBSCRIBE, UNSUBSCRIBE } from '../../actionTypes';

import * as api from '../../api';

import { success, info } from '../../actions/alerts';

function* subscribe({ payload }) {
  yield fork(api.subscriptions.subscribe, payload.id);
  yield put(success(`You are now following ${payload.name}`));
}

function* unsubscribe({ payload }) {
  yield fork(api.subscriptions.unsubscribe, payload.id);
  yield put(info(`You are no longer following ${payload.name}`));
}

export default function* watch() {
  yield takeEvery(SUBSCRIBE, subscribe);
  yield takeEvery(UNSUBSCRIBE, unsubscribe);
}
