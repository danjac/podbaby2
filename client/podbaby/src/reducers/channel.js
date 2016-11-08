import {
  FETCH_CHANNEL_EPISODES_FAILURE,
  FETCH_CHANNEL_EPISODES_REQUEST,
  FETCH_CHANNEL_EPISODES_SUCCESS,
  FETCH_CHANNEL_FAILURE,
  FETCH_CHANNEL_REQUEST,
  FETCH_CHANNEL_SUCCESS,
} from '../actionTypes';

const initialState = {
  loading: false,
  channel: null,
  error: null,

  episodes: {
    loading: false,
    results: [],
    next: 0,
    previous: 0,
    error: null,
  },

};

export default function(state = initialState, action) {

  switch (action.type) {

    case FETCH_CHANNEL_EPISODES_REQUEST:
      return {...state,
        episodes: {
          loading: true,
          error: null,
          results: [],
          next: 0,
          previous: 0,
        },
      };

    case FETCH_CHANNEL_EPISODES_FAILURE:
      return {...state,
        episodes: {
          loading: false,
          results: [],
          next: 0,
          previous: 0,
          error: action.error,
        },
      };

    case FETCH_CHANNEL_EPISODES_SUCCESS:

      let {
        previous,
        next,
        results,
      } = action.payload;

      return {...state,
        episodes: {
          loading: false,
          results,
          next,
          previous,
        },
      };

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
