import React, { PropTypes, Component } from 'react';

import Pager from '../components/pager';
import Episode from '../components/episode';

export default class EpisodeList extends Component {

  render() {

    if (this.props.isLoading) {
        return <h1>Waiting...</h1>;
    }

    const { next, previous, episodes, onSelectPager } = this.props;

    const pager = (previous || next) ?
      <Pager next={next} previous={previous} onSelect={onSelectPager} /> : '';

    return (
      <div>
          {pager}
          {episodes.map(episode => (
          <Episode key={episode.id}
                   episode={episode}
                   {...this.props} />
          ))}
          {pager}
      </div>
    );
  }
}

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
