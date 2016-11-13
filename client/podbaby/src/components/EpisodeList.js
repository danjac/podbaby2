import React, { PropTypes, createElement } from 'react';
import * as bs from 'react-bootstrap';

import { episodeShape } from '../propTypes';

import Pager from './Pager';
import EpisodeListItem from './EpisodeListItem';

import './EpisodeList.css';

const EpisodeList = props => {

  const {
    component,
    next,
    previous,
    episodes,
    ifEmpty,
    onSelectPage,
  } = props;

  if (!episodes.length) {
    const msg = ifEmpty || 'No podcasts found';
    return (
      <bs.Well className="episode-list-empty">{msg}</bs.Well>
    );
  }

  const pager = (previous || next) ? (
    <Pager next={next}
           previous={previous}
           onSelect={onSelectPage} />) : '';

  return (
    <div className="episode-list">
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
