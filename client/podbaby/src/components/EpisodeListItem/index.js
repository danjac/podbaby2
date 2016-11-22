import React from 'react';
import { Link } from 'react-router';
import * as bs from 'react-bootstrap';

import { episodeShape } from '../../propTypes';
import defaultThumbnail from '../../assets/podcast.svg';

import Description from '../Description';
import Labels from '../Labels';
import EpisodeButtons from '../EpisodeButtons';
import EpisodeDates from '../EpisodeDates';

import './index.css';

export const EpisodeListItem = props => {

  const { episode, episode: { channel } } = props;

  const thumbnail = channel.thumbnail || {
    url: defaultThumbnail,
    height: 120,
    width: 120,
  };

  const description = episode.subtitle || episode.summary || episode.description;

  const title = episode.title || channel.name;
  const buttons = <EpisodeButtons {...props } />;
  const header = <Link to={`/podcasts/${episode.id}/`}>{title}</Link>;

  return (
    <bs.Panel header={header}
              footer={buttons}
              className="episode">

      <h2 className="channel-name">
        <Link to={`/feeds/${channel.id}/`}>{channel.name}</Link>
      </h2>
      <bs.Media>
        <bs.Media.Left>
          <img src={thumbnail.url}
               width={thumbnail.width}
               height={thumbnail.height}
               alt={channel.name} />
        </bs.Media.Left>
        <bs.Media.Body>
          <Labels categories={channel.categories}
                  explicit={episode.explicit} />
        </bs.Media.Body>
      </bs.Media>
      <EpisodeDates episode={episode} />
      <Description content={description} />
    </bs.Panel>
  );
};

EpisodeListItem.propTypes = {
  episode: episodeShape,
};

export default EpisodeListItem;
