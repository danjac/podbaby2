import React from 'react';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';

import { episodeShape } from '../propTypes';

import './EpisodeLinks.css';

const EpisodeLinks = ({ episode, episode: { channel } }) => {

  const links = [];

  if (episode.link) {
    links.push(
      <a href={episode.link} className="btn btn-default btn-sm">
        <Icon name="info" /> Link
      </a>
    );
  }

  if (channel.rssFeed) {
    links.push(
      <a href={channel.rssFeed} className="btn btn-default btn-sm">
        <Icon name="rss" /> RSS
      </a>
    );
  }

  if (channel.link) {
    links.push(
      <a href={channel.link} className="btn btn-default btn-sm">
        <Icon name="globe" /> Website
      </a>
    );
  }


  return (
    <bs.ButtonGroup justified className="episode-links">
      {links.map((link, index) => (
        <bs.ButtonGroup key={index}>{link}</bs.ButtonGroup>
      ))}
    </bs.ButtonGroup>);

};

EpisodeLinks.propTypes = {
  episode: episodeShape.isRequired,
};

export default EpisodeLinks;
