import * as api from '../utils/api';

export const FETCH_CATEGORIES = 'podbaby/CATEGORIES/FETCH_CATEGORIES';
export const FETCH_CATEGORIES_SUCCESS = 'podbaby/CATEGORIES/FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'podbaby/CATEGORIES/FETCH_CATEGORIES_FAILURE';


const initialState = {
  isLoading: false,
  results: [],
};

export function fetchCategories() {
  return dispatch => {
    dispatch({ type: FETCH_CATEGORIES });
    return api.get('/api/categories/')
      .then(payload => {
        dispatch({
          type: FETCH_CATEGORIES_SUCCESS,
          payload,
        });
      }, error => {
        dispatch({
          type: FETCH_CATEGORIES_FAILURE,
          error,
        });
      });
  };
}

export default function(state=initialState, action) {
  switch(action.type) {
    case FETCH_CATEGORIES:
      return { ...state, isLoading: true };
    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, results: action.payload, isLoading: false };
    case FETCH_CATEGORIES_FAILURE:
      return initialState;
    default:
      return state;
  }
}
