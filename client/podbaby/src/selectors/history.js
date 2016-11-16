export const historySelector = state => state.history;

export const lastPlayed = (history, episode) => {
  return history
    .filter(play => episode.id === play.episode)
    .map(play => new Date(play.created))
    .sort((a, b) => a - b)
    .pop();
};


