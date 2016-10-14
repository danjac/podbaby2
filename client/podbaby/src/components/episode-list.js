import React, { PropTypes } from 'react';

import Pager from './pager';
import Episode from './episode';

const EpisodeList = props => {

  const {
    next,
    previous,
    episodes,
    ifEmpty,
    onSelectPage,
  } = props;

  const style = { marginTop: 10 };

  if (!episodes.length) {
    const msg = ifEmpty || 'No podcasts found';
    return (
      <div style={style}>{msg}</div>
    );
  }

  const pager = (previous || next) && (
    <Pager next={next}
           previous={previous}
           onSelect={onSelectPage} />);

  return (
    <div style={style}>
      {pager}
      {episodes.map(episode => (
      <Episode key={episode.id}
               episode={episode}
               {...props} />
      ))}
      {pager}
    </div>
  );
};

EpisodeList.propTypes = {
  episodes: PropTypes.array.isRequired,
  next: PropTypes.string,
  previous: PropTypes.string,
  ifEmpty: PropTypes.string,
  onSelectPage: PropTypes.func.isRequired,
  onSubscribe: PropTypes.func.isRequired,
  onUnsubscribe: PropTypes.func.isRequired,
  onAddBookmark: PropTypes.func.isRequired,
  onRemoveBookmark: PropTypes.func.isRequired,
  onStartPlayer: PropTypes.func.isRequired,
  onStopPlayer: PropTypes.func.isRequired,
};

export default EpisodeList;
