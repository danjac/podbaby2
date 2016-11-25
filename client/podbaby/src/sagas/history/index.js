import { takeEvery } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import * as api from '../../api';

import { CLEAR_HISTORY } from '../../actionTypes';

function* clearHistory() {
  yield fork(api.history.clearHistory);
}

export default function* watch() {
  takeEvery(CLEAR_HISTORY, clearHistory);
}


