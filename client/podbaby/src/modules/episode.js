import * as api from '../utils/api';

export const FETCH_EPISODE = 'podbaby/episode/FETCH_EPISODE';
export const FETCH_EPISODES_SUCCESS = 'podbaby/episode/FETCH_EPISODE_SUCCESS';
export const FETCH_EPISODES_FAILURE = 'podbaby/episode/FETCH_EPISODE_FAILURE';


const initialState = {
  isLoading: false,
  notFound: false,
  episode: null,
};

export function fetchEpisode(id) {
  return dispatch => {
    dispatch({
      type: FETCH_EPISODE
    });
    return api.get(`/api/episodes/${id}/`)
      .then(payload => {
        dispatch({
          type: FETCH_EPISODES_SUCCESS,
          payload,
        });
      }, () => dispatch({
        type: FETCH_EPISODES_FAILURE
      }));
  };
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_EPISODE:
      return {...state,
        isLoading: true
      };
    case FETCH_EPISODES_SUCCESS:
      return {...state,
        episode: action.payload,
        isLoading: false,
        notFound: false
      };
    case FETCH_EPISODES_FAILURE:
      return {...state,
        episode: null,
        isLoading: false,
        notFound: true,
      };
    default:
      return state;
  }
}
