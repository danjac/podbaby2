import React, { PropTypes, createElement } from 'react';
import * as bs from 'react-bootstrap';

import { episodeShape } from '../propTypes';

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
      <bs.Well>{msg}</bs.Well>
    );
  }

  const pager = (previous || next) ? (
    <Pager next={next}
           previous={previous}
           onSelect={onSelectPage} />) : '';

  return (
    <div style={style}>
      {pager}
      {episodes.map(episode => createElement(
        component, { key: episode.id, episode, ...props }))}
      {pager}
    </div>
  );
};

EpisodeList.propTypes = {
  episodes: PropTypes.arrayOf(episodeShape),
  next: PropTypes.number,
  previous: PropTypes.number,
  component: PropTypes.func.isRequired,
  ifEmpty: PropTypes.string,
  onSelectPage: PropTypes.func.isRequired,
};

EpisodeList.defaultProps = {
  component: EpisodeListItem,
};

export default EpisodeList;
