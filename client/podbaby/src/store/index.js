import {
  createStore,
  applyMiddleware,
} from 'redux';

import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';

import reducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

export default function(initialState) {
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(
      thunk,
      createLogger(),
      sagaMiddleware,
    ));

  sagaMiddleware.run(rootSaga);

  return store;
}
