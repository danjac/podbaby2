import React from 'react';
import { Link } from 'react-router';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';

import { episodeShape } from '../../propTypes';
import EpisodeButtons from '../EpisodeButtons';
import EpisodeDates from '../EpisodeDates';
import Description from '../Description';

import './ChannelEpisodeListItem.css';

const ChannelEpisodeListItem = props => {

  const { episode } = props;

  const description = episode.subtitle || episode.summary || episode.description;

  const buttons = <EpisodeButtons {...props } withChannel={false} />;

  const header = (
    <Link to={`/podcasts/${episode.id}/`}>
      {episode.title || 'Podcast'}
    </Link>);

  return (
    <bs.Panel header={header}
              footer={buttons}
              className="episode">

      {episode.explicit && (
      <bs.Label key="explicit" bsStyle="danger">
        <Icon name="warning" /> Explicit
      </bs.Label>)}
      <EpisodeDates episode={episode} />
      <Description content={description} />
    </bs.Panel>
  );
};

ChannelEpisodeListItem.propTypes = {
  episode: episodeShape,
};


export default ChannelEpisodeListItem;
