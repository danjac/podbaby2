import React from 'react';

import { episodeShape } from '../../propTypes';
import { formatDate, timeSince } from '../utils';

import './EpisodeDates.css';


const EpisodeDates = ({ episode }) => {

  const published = formatDate(episode.published);
  const lastPlayed = timeSince(episode.lastPlayed);

  return (
    <div className="episode-dates">
      <span>{published}</span>
      {lastPlayed && <mark>Played {lastPlayed}</mark>}
    </div>
  );
};

EpisodeDates.propTypes = {
  episode: episodeShape,
};

export default EpisodeDates;
