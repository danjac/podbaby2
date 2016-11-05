import {
  pageNumberFromUrl,
  dispatchApiCall,
} from './utils';

describe('dispatchApiCall', () => {

  const SOME_REQUEST = 'SOME_REQUEST';
  const SOME_SUCCESS = 'SOME_SUCCESS';
  const SOME_FAILURE = 'SOME_FAILURE';

  it('should return success', () => {
    const dispatch = jest.fn();

    const payload = {
      id: 1,
      name: 'test',
    };

    const apiCall = new Promise(resolve => resolve(payload));

    return dispatchApiCall(
      dispatch,
      apiCall,
      SOME_REQUEST,
      SOME_SUCCESS,
      SOME_FAILURE,
    ).then(() => {
      expect(dispatch.mock.calls.length).toBe(2);

      expect(dispatch).toBeCalledWith({
        type: SOME_REQUEST,
      });

      expect(dispatch).toBeCalledWith({
        type: SOME_SUCCESS,
        payload,
      });

    });

  });

  it('should return error', () => {
    const dispatch = jest.fn();

    const error = new Error('Oops');

    const apiCall = new Promise(resolve => {
      throw error;
    });

    return dispatchApiCall(
      dispatch,
      apiCall,
      SOME_REQUEST,
      SOME_SUCCESS,
      SOME_FAILURE,
    ).then(() => {
      expect(dispatch.mock.calls.length).toBe(2);

      expect(dispatch).toBeCalledWith({
        type: SOME_REQUEST,
      });

      expect(dispatch).toBeCalledWith({
        type: SOME_FAILURE,
        error,
      });

    });

  });
});

describe('pageNumberFromUrl', () => {
  it('should parse 0 from url if null', () => {
    expect(pageNumberFromUrl(null)).toBe(0);
  });

  it('should parse 1 from url if no page found', () => {
    const url = '/api/episodes/';
    expect(pageNumberFromUrl(url)).toBe(1);
  });

  it('should parse page from url', () => {
    const url = '/api/episodes/?page=3';
    expect(pageNumberFromUrl(url)).toBe(3);
  });

  it('should not parse non-numeric page from url', () => {
    const url = '/api/episodes/?page=x';
    expect(pageNumberFromUrl(url)).toBe(1);
  });
});
