const START = 'podbaby/player/START';
const STOP = 'podbaby/player/STOP';

export function startPlayer(episode) {
  return {
    type: START,
    payload: {
      episode,
    },
  };
}

export function stopPlayer() {
  return { type: STOP };
}

const initialState = {
  episode: null,
  isPlaying: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case START:
      return { ...state, isPlaying: true, episode: action.payload.episode };
    case STOP:
      return { ...state, isPlaying: false, episode: null};
    default:
      return state;
  }
}
