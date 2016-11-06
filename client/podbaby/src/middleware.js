export const errorMiddleware = store => next => action => {
  const result = next(action);
  const error = result && result.error;
  if (error) {
    throw error;
  }
  return result;
};
