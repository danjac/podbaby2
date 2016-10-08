import React, { PropTypes } from 'react';

import Pager from './pager';
import Episode from './episode';

const EpisodeList = props => {

  const {
    next,
    previous,
    episodes,
    onSelectPage,
  } = props;

  const pager = (previous || next) && (
    <Pager next={next}
           previous={previous}
           onSelect={onSelectPage} />);

  return (
    <div style={{ marginTop: 10 }}>
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
  onSelectPage: PropTypes.func.isRequired,
  onSubscribe: PropTypes.func.isRequired,
  onUnsubscribe: PropTypes.func.isRequired,
  onAddBookmark: PropTypes.func.isRequired,
  onRemoveBookmark: PropTypes.func.isRequired,
  onStartPlayer: PropTypes.func.isRequired,
  onStopPlayer: PropTypes.func.isRequired,
};

export default EpisodeList;
