import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import * as bs from 'react-bootstrap';
import moment from 'moment';

import { sanitize } from '../utils';
import defaultThumbnail from '../podcast.svg';
import Labels from './Labels';
import EpisodeButtons from './EpisodeButtons';

export const EpisodeListItem = props => {

  const {
    episode,
    episode: {
      channel,
    },
  } = props;

  const thumbnail = channel.thumbnail || {
    url: defaultThumbnail,
    height: 120,
    width: 120,
  };

  const published = episode.published && moment(episode.published).format(
    'MMMM Do YYYY'
  );

  const description = sanitize(
    episode.subtitle || episode.summary || episode.description
  );

  const title = episode.title || channel.name;
  const buttons = <EpisodeButtons {...props } />;

  return (
    <bs.Panel header={channel.name}
      footer={buttons}
      className="episode">

      <h4 style={{ textAlign: 'center' }}>
        <Link to={`/podcasts/${episode.id}/`}>{title}</Link>
      </h4>

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
          {published && <p><strong>{published}</strong></p>}
        </bs.Media.Body>
      </bs.Media>
      <p style={{ marginTop: 10 }}
        dangerouslySetInnerHTML={description}></p>
    </bs.Panel>
  );
};

EpisodeListItem.propTypes = {
  episode: PropTypes.object.isRequired,
};


export default EpisodeListItem;
