import { delay, takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { CREATE_ALERT } from '../../actionTypes';
import { dismissAlert } from '../../actions/alerts';

function* timeout({ payload: { id } }) {
  yield call(delay, 3000);
  yield put(dismissAlert(id));
}

export default function* watch() {
  yield takeEvery(CREATE_ALERT, timeout);
}
