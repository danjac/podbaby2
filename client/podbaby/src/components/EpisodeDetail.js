import React, { PropTypes, Component } from 'react';
import * as bs from 'react-bootstrap';
import { Link } from 'react-router';
import moment from 'moment';

import { episodeShape } from '../propTypes';

import Loader from './Loader';
import Description from './Description';
import EpisodeButtons from './EpisodeButtons';
import Labels from './Labels';
import NotFound from './NotFound';

import defaultThumbnail from './podcast.svg';
import './EpisodeDetail.css';

class EpisodeDetail extends Component {

  render() {
    const {
      loading,
      error,
      episode,
    } = this.props;

    if (error) {
      return <NotFound />;
    }

    if (loading || !episode) {
      return <Loader />;
    }

    const { channel } = episode;

    const description = episode.description || episode.summary || episode.subtitle;

    const thumbnail = channel.thumbnail || {
      url: defaultThumbnail,
      height: 120,
      width: 120,
    };

    const published = episode.published && moment(episode.published).format(
      'MMMM Do YYYY'
    );

    const buttons = <EpisodeButtons {...this.props} />;
    const header = <h3 className="panel-title">{episode.title}</h3>;

    return (
      <div>
        <bs.Panel bsStyle="primary"
                  header={header}
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
              {published && <p><strong>{published}</strong></p>}
            </bs.Media.Body>
          </bs.Media>
          <Description content={description} />
        </bs.Panel>
      </div>
    );

  }
}

EpisodeDetail.propTypes = {
  episode: episodeShape,
  authenticated: PropTypes.bool.isRequired,
  error: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

export default EpisodeDetail;
