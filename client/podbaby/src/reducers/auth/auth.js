import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  CHANGE_EMAIL,
  NOT_AUTHENTICATED,
  LOGOUT,
} from '../../actionTypes';

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

    case CHANGE_EMAIL:
      return {...state,
        user: {
          ...state.user,
          email: action.payload.email,
        },
      };

    case FETCH_USER_REQUEST:
      return {...state,
        loading: true,
        authenticated: true,
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
