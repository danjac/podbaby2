import { fork } from 'redux-saga/effects';

import alerts from './alerts';
import channel from './channel';
import episodes from './episodes';
import auth from './auth';

export default function* rootSaga() {
  yield [
    fork(auth),
    fork(alerts),
    fork(channel),
    fork(episodes),
  ];
}
