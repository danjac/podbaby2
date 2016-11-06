import {
  createStore,
  applyMiddleware,
} from 'redux';

import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducer from './reducers';
import { errorMiddleware } from './middleware';

export default function(initialState) {
  return createStore(
    reducer,
    initialState,
    applyMiddleware(
      thunk,
      createLogger(),
      errorMiddleware,
    ));
}
