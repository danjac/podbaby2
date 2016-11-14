import React from 'react';
//import * as bs from 'react-bootstrap';

import { episodeShape } from '../propTypes';
import { formatDate, timeSince } from './utils';

import './EpisodeDates.css';


const EpisodeDates = ({ episode }) => {

  const published = formatDate(episode.published);
  const lastPlayed = timeSince(episode.lastPlayed);

  return (
    <div className="episode-dates">
      {published && <div>{published}</div>}
      {lastPlayed && <div><mark>Played {lastPlayed}</mark></div>}
    </div>
  );
};

EpisodeDates.propTypes = {
  episode: episodeShape,
};

export default EpisodeDates;
