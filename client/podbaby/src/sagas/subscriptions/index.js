import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';

import { SUBSCRIBE, UNSUBSCRIBE } from '../../actionTypes';

import { success, info } from '../../actions/alerts';

function* subscribe({ payload }) {
  yield put(success(`You are now following ${payload.name}`));
}

function* unsubscribe({ payload }) {
  yield put(info(`You are no longer following ${payload.name}`));
}

export default function* watch() {
  yield takeEvery(SUBSCRIBE, subscribe);
  yield takeEvery(UNSUBSCRIBE, unsubscribe);
}
