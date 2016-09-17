import * as api from '../utils/api';

const FETCH_EPISODES = 'podbaby/episodes/FETCH_EPISODES';
const FETCH_EPISODES_SUCCESS = 'podbaby/episodes/FETCH_SUCCESS';
const FETCH_EPISODES_FAILURE = 'podbaby/episodes/FETCH_FAILURE';


const initialState = {
  isLoading: false,
  results: [],
  next: null,
  previous: null,
};

export function fetchEpisodes(url) {
  return dispatch => {
    dispatch({ type: FETCH_EPISODES });
    return api.get(url)
    .then(payload => {
      dispatch({
        type: FETCH_EPISODES_SUCCESS,
        payload,
      });
    }, error => {
      dispatch({
        type: FETCH_EPISODES_FAILURE,
        error,
      });
    });
  };
}

export default function (state=initialState, action) {
  switch (action.type) {
    case FETCH_EPISODES:
      return { ...initialState, isLoading: true };
    case FETCH_EPISODES_FAILURE:
      return initialState;
    case FETCH_EPISODES_SUCCESS:
      return { ...action.payload, isLoading: false };
    default:
      return state;
  }
}
