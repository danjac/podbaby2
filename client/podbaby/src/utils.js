import sanitizeHtml from 'sanitize-html';

const sanitizeOptions = {
  allowedTags: ['a', 'code', 'em', 'strong', 'b', 'br', 'span', 'pre'],
  allowedAttributes: {
    a: ['href'],
    span: ['style'],
  },
};

export const sanitize = dirty => {
  return {
    __html: sanitizeHtml(dirty.replace('\n', '<br>'), sanitizeOptions),
  };
};

export const pageNumberFromUrl = url => {
  if (!url) {
    return 0;
  }
  const match = /.*?[\?&]page=(\d+).*?/.exec(url);
  if (match) {
    return Number(match[1]).valueOf();
  }
  return 1;
};

export const createAction = (type, payload) => ({ type, payload });
export const createErrorAction = (type, error) => ({ type, error });

export const dispatchApiCall = (
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
