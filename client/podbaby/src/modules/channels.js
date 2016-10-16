import * as api from '../utils/api';

export const FETCH_CHANNELS = 'podbaby/CHANNELS/FETCH_CHANNELS';
export const FETCH_CHANNELS_SUCCESS = 'podbaby/CHANNELS/FETCH_CHANNELS_SUCCESS';
export const FETCH_CHANNELS_FAILURE = 'podbaby/CHANNELS/FETCH_CHANNELS_FAILURE';


const initialState = {
  isLoading: false,
  results: [],
  next: null,
  previous: null,
};

export function fetchChannels(url, params) {
  return dispatch => {
    dispatch({ type: FETCH_CHANNELS });
    return api.get(url, { params })
    .then(payload => {
      dispatch({
        type: FETCH_CHANNELS_SUCCESS,
        payload,
      });
    }, error => {
      dispatch({
        type: FETCH_CHANNELS_FAILURE,
        error,
      });
    });
  };
}

export default function (state=initialState, action) {
  switch (action.type) {
    case FETCH_CHANNELS:
      return { ...state, isLoading: true };
    case FETCH_CHANNELS_FAILURE:
      return initialState;
    case FETCH_CHANNELS_SUCCESS:
      return { ...state, ...action.payload, isLoading: false };
    default:
      return state;
  }
}
