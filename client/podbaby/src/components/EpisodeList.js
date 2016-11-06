import React, { PropTypes } from 'react';

import { episodesPropTypes } from '../prop-types';

import Pager from './Pager';
import EpisodeListItem from './EpisodeListItem';

const EpisodeList = props => {

  const {
    next,
    previous,
    episodes,
    ifEmpty,
    onSelectPage,
  } = props;

  const style = {
    marginTop: 10,
  };

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
      <EpisodeListItem key={episode.id} episode={episode} {...props} />
      ))}
      {pager}
    </div>
  );
};

EpisodeList.propTypes = {
  ...episodesPropTypes.isRequired,
  ifEmpty: PropTypes.string,
  onSelectPage: PropTypes.func.isRequired,
};

export default EpisodeList;
