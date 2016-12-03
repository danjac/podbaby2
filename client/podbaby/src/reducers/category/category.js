import {
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_FAILURE,
} from '../../actionTypes';

const initialState = {
  category: null,
  loading: false,
  error: null,
};

export default function(state = initialState, action) {

  switch (action.type) {
    case FETCH_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        category: action.payload,

      };
    case FETCH_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
