import React from 'react';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';

import { channelShape } from '../propTypes';

import './ChannelLinks.css';

const ChannelLinks = ({ channel }) => {
  const links = [];

  if (channel.link) {
    links.push(
      <a href={channel.link} className="btn btn-default btn-sm">
        <Icon name="globe" /> Website
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

  return (
    <bs.ButtonGroup justified className="channel-links">
      {links.map((link, index) => (
        <bs.ButtonGroup key={index}>{link}</bs.ButtonGroup>
      ))}
    </bs.ButtonGroup>);

};

ChannelLinks.propTypes = {
  channel: channelShape.isRequired,
};

export default ChannelLinks;
