import { fork } from 'redux-saga/effects';

import alerts from './alerts';
import category from './category';
import categories from './categories';
import channel from './channel';
import channels from './channels';
import episodes from './episodes';
import subscriptions from './subscriptions';
import auth from './auth';

export default function* rootSaga() {
  yield [
    fork(auth),
    fork(alerts),
    fork(category),
    fork(categories),
    fork(channel),
    fork(channels),
    fork(episodes),
    fork(subscriptions),
  ];
}
