import { warning } from './modules/alerts';

const handleError = (error, store) => {
  let msg;
  const status = error.response && error.response.status;
  switch (status) {
    case 403:
      msg = 'You should not be here';
      break;
    case 404:
      msg = 'Sorry, API not able to find this route';
      break;
    default:
      msg = 'Sorry, an unexpected error has occurred';
      console.error(error);
  }
  store.dispatch(warning(msg));
};

export const errorMiddleware = store => next => action => {
  try {
    const result = next(action);
    const error = result && result.error;
    if (error) {
      throw error;
    }
    return result;
  } catch(error) {
    handleError(error, store);
    throw error;
  }
};
