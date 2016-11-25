import { fork } from 'redux-saga/effects';

import alerts from './alerts';
import auth from './auth';
import bookmarks from './bookmarks';
import category from './category';
import categories from './categories';
import channel from './channel';
import channels from './channels';
import episode from './episode';
import episodes from './episodes';
import subscriptions from './subscriptions';

export default function* rootSaga() {
  yield [
    fork(auth),
    fork(alerts),
    fork(bookmarks),
    fork(category),
    fork(categories),
    fork(channel),
    fork(channels),
    fork(episode),
    fork(episodes),
    fork(subscriptions),
  ];
}
