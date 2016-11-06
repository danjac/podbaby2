import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  LOGOUT,
  NOT_AUTHENTICATED,
} from '../actionTypes';

const initialState = {
  authenticated: false,
  loading: false,
  error: null,
  user: null,
};

export default function(state = initialState, action) {

  switch (action.type) {

    case LOGOUT:
      return {...state,
        authenticated: false,
        user: null,
      };

    case NOT_AUTHENTICATED:
      return {...state,
        authenticated: false,
        user: null,
      };

    case FETCH_USER_REQUEST:
      return {...state,
        loading: true,
      };

    case FETCH_USER_FAILURE:
      return {...state,
        error: action.error,
        authenticated: false,
        user: null,
        loading: false,
      };

    case FETCH_USER_SUCCESS:
      return {...state,
        user: action.payload,
        authenticated: true,
        loading: false,
      };

    default:
      return state;

  }
}
