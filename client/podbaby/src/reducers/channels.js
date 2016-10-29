import {
  FETCH_CHANNELS_REQUEST,
  FETCH_CHANNELS_SUCCESS,
  FETCH_CHANNELS_FAILURE,
} from '../action-types';

import {
  pageNumberFromUrl,
} from '../utils';

const initialState = {
  loading: false,
  results: [],
  next: 0,
  previous: 0,
  error: null,
};

export default function(state = initialState, action) {

  switch (action.type) {

    case FETCH_CHANNELS_REQUEST:
      return {...state,
        loading: true,
        error: null,
      };

    case FETCH_CHANNELS_FAILURE:
      return {...state,
        loading: false,
        error: action.error,
      };

    case FETCH_CHANNELS_SUCCESS:

      const {
        previous,
        next,
        results,
      } = action.payload;

      return {
        ...state,
        results,
        loading: false,
        previous: pageNumberFromUrl(previous),
        next: pageNumberFromUrl(next),
      };

    default:
      return state;
  }
}
