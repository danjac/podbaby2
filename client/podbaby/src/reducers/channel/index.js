import {
  FETCH_CHANNEL_FAILURE,
  FETCH_CHANNEL_REQUEST,
  FETCH_CHANNEL_SUCCESS,
} from '../../actionTypes';

const initialState = {
  loading: false,
  channel: null,
  error: null,
};

export default function(state = initialState, action) {

  switch (action.type) {

    case FETCH_CHANNEL_REQUEST:
      return {...state,
        loading: true,
        error: null,
      };

    case FETCH_CHANNEL_SUCCESS:
      return {...state,
        loading: false,
        channel: action.payload,
      };

    case FETCH_CHANNEL_FAILURE:
      return {...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;

  }
}
