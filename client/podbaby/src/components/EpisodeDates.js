import React from 'react';
import * as bs from 'react-bootstrap';
import moment from 'moment';

import { episodeShape } from '../propTypes';

import './EpisodeDates.css';


const formatDate = date => date && moment(date).format('MMMM Do YYYY');

const EpisodeDates = ({ episode }) => {

  const published = formatDate(episode.published);
  const lastPlayed = episode.lastPlayed && moment(episode.lastPlayed).fromNow();

  return (
    <div className="episode-dates">
      {published && <strong>{published}</strong>}
      {lastPlayed && (
      <bs.Label bsStyle="success">Played {lastPlayed}</bs.Label>
      )}
    </div>
  );
};

EpisodeDates.propTypes = {
  episode: episodeShape,
};

export default EpisodeDates;
