import * as api from '../../api';
import { createAction } from '../utils';

import { SUBSCRIBE, UNSUBSCRIBE } from '../../actionTypes';

export const subscribe = channel => {
  api.subscriptions.subscribe(channel.id);
  return createAction(SUBSCRIBE, channel.id);
};

export const unsubscribe = channel => {
  api.subscriptions.unsubscribe(channel.id);
  return createAction(UNSUBSCRIBE, channel.id);
};
