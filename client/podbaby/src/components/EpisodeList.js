import React, { PropTypes, createElement } from 'react';

import { episodesPropTypes } from '../propTypes';

import Pager from './Pager';
import EpisodeListItem from './EpisodeListItem';

const EpisodeList = props => {

  const {
    component,
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

  const pager = (previous || next) ? (
    <Pager next={next}
           previous={previous}
           onSelect={onSelectPage} />) : '';

  return (
    <div style={style}>
      {pager}
      {episodes.map(episode => createElement(component, { key: episode.id, episode, ...props }))}
      {pager}
    </div>
  );
};

EpisodeList.propTypes = {
  ...episodesPropTypes.isRequired,
  component: PropTypes.func.isRequired,
  ifEmpty: PropTypes.string,
  onSelectPage: PropTypes.func.isRequired,
};

EpisodeList.defaultProps = {
  component: EpisodeListItem,
};

export default EpisodeList;
