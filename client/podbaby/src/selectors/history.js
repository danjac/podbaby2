export const historySelector = state => state.history;

export const lastPlayed = (history, episode) => {
  const dates = history
    .filter(play => episode.id === play.episode)
    .map(play => new Date(play.created))
    .sort((a, b) => b - a);

  if (dates.length) {
    return dates[0];
  }
  return null;
};


