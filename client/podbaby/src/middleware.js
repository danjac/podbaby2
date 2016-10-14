export const apiErrorMiddleware = store => next => action => {

  try {
    return next(action);
  } catch (err) {
    if (err.response) {

      const { response } = err;
      switch (response.status) {

        // handle 403s, 404s etc...
        case 403:
          break;

        default:
          console.log(err);
          return;

      }
    }
    //throw err;
  }

};
