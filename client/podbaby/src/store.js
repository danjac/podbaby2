import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from './modules';
import { apiErrorMiddleware } from './middleware';

export default function(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      thunk,
      apiErrorMiddleware,
      createLogger(),
    ));
}
