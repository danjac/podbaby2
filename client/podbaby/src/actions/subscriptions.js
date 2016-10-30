import * as api from '../api';

import {
  SUBSCRIBE,
  UNSUBSCRIBE,
} from '../action-types';


export const subscribe = channel => {
  api.subscriptions.subscribe(channel.id);
  return {
    type: SUBSCRIBE,
    payload: channel,
  };
};

export const unsubscribe = channel => {
  api.subscriptions.unsubscribe(channel.id);
  return {
    type: UNSUBSCRIBE,
    payload: channel,
  };
};
