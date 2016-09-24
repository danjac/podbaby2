import React, { PropTypes } from 'react';

import Pager from './pager';
import Episode from './episode';
import Loader from './loader';

const EpisodeList = props => {

    if (props.isLoading) {
        return <Loader />;
    }
    const { next, previous, episodes, onSelectPager } = props;

    const pager = (previous || next) ?
      <Pager next={next} previous={previous} onSelect={onSelectPager} /> : '';


    return (
      <div>
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
  isLoading: PropTypes.bool.isRequired,
  episodes: PropTypes.array.isRequired,
  next: PropTypes.string,
  previous: PropTypes.string,
  player: PropTypes.object.isRequired,
  onSelectPager: PropTypes.func.isRequired,
  onStartPlayer: PropTypes.func.isRequired,
  onStopPlayer: PropTypes.func.isRequired,
};

export default EpisodeList;
