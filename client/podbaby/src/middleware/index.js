import { isError } from 'lodash';

export const errorMiddleware = store => next => action => {
  const result = next(action);
  const error = result && result.error;
  if (isError(error)) {
    throw error;
  }
  return result;
};
