import React, { PropTypes } from 'react';
import Icon from 'react-fa';
import moment from 'moment';
import * as bs from 'react-bootstrap';

import sanitize from '../utils/sanitize';
import Buttons from './episode-buttons';

import defaultThumbnail from '../podcast.svg';

export const Episode = props => {

  const { episode, episode: { channel } } = props;

  const categoryStyle = {
    display: 'inline-block',
  };

  let categories = channel.categories.map(cat => (
    <a href="#" key={cat.id}>
      <bs.Label style={categoryStyle}>{cat.name}
    </bs.Label>&nbsp;</a>
  ));

  if (episode.explicit) {
    categories = [...categories, [(
      <bs.Label key="explicit" bsStyle="danger" style={categoryStyle}>
        <Icon name="warning" /> Explicit
      </bs.Label>
    )]];
  }

  const thumbnail = channel.thumbnail || {
    url: defaultThumbnail,
    height: 120,
    width: 120,
  };

  const published = episode.published && moment(episode.published).format(
    'MMMM Do YYYY'
  );

  return (
    <bs.Panel header={channel.name}
              footer={<Buttons {...props} />}
              className="episode">
      <h4 style={{ textAlign: 'center' }}>
        <a href={`/podcasts/${episode.id}/`}>{episode.title}</a>
      </h4>
      <bs.Media>
        <bs.Media.Left>
          <img src={thumbnail.url}
               width={thumbnail.width}
               height={thumbnail.height}
               alt={channel.name} />
        </bs.Media.Left>
        <bs.Media.Body>
          <p>{categories}</p>
          {published && <p><strong>{published}</strong></p>}
        </bs.Media.Body>
      </bs.Media>
      <p style={{ marginTop: 10 }}
         dangerouslySetInnerHTML={sanitize(episode.subtitle)}></p>
    </bs.Panel>
  );
};

Episode.propTypes = {
  episode: PropTypes.object.isRequired,
};


export default Episode;
