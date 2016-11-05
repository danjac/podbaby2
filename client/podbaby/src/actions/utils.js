export const createAction = (type, payload) => ({ type, payload });
export const createErrorAction = (type, error) => ({ type, error });

export const dispatchApiCall = (
  // does multiple dispatch of request/success/failure from promise
  dispatch,
  apiCall,
  requestType,
  successType,
  failureType) => {
  dispatch(createAction(requestType));
  return apiCall
    .then(payload => dispatch(createAction(successType, payload)))
    .catch(error => dispatch(createErrorAction(failureType, error)));
};
