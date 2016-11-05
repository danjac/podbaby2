import * as api from '../api';
import { createAction } from './utils';

import { SUBSCRIBE, UNSUBSCRIBE } from '../action-types';

export const subscribe = channel => {
  api.subscriptions.subscribe(channel.id);
  return createAction(SUBSCRIBE, channel);
};

export const unsubscribe = channel => {
  api.subscriptions.unsubscribe(channel.id);
  return createAction(UNSUBSCRIBE, channel);
};
