import {
  FETCH_EPISODES_REQUEST,
  FETCH_EPISODES_SUCCESS,
  FETCH_EPISODES_FAILURE,
} from '../action-types';

import { pageNumberFromUrl } from './utils';

const initialState = {
  loading: false,
  results: [],
  next: null,
  previous: null,
  error: null,
};

export default function(state = initialState, action) {

  switch (action.type) {

    case FETCH_EPISODES_REQUEST:
      return {...state,
        loading: true,
        error: null,
      };

    case FETCH_EPISODES_FAILURE:
      return { ...state, error: action.error };

    case FETCH_EPISODES_SUCCESS:

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
