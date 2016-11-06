import {
  FETCH_EPISODE_FAILURE,
  FETCH_EPISODE_REQUEST,
  FETCH_EPISODE_SUCCESS,
} from '../action-types';

const initialState = {
  loading: false,
  episode: null,
  error: null,
};

export default function(state = initialState, action) {

  switch (action.type) {

    case FETCH_EPISODE_REQUEST:
      return {...state,
        loading: true,
        error: null,
      };

    case FETCH_EPISODE_SUCCESS:
      return {...state,
        loading: false,
        episode: action.payload,
      };

    case FETCH_EPISODE_FAILURE:
      return {...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;

  }
}
