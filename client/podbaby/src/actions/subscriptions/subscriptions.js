import { SUBSCRIBE, UNSUBSCRIBE } from '../../actionTypes';

export const subscribe = channel => {
  return { type: SUBSCRIBE, payload: channel };
};

export const unsubscribe = channel => {
  return { type: UNSUBSCRIBE, payload: channel };
};
