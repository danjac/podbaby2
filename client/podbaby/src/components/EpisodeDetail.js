import React, { PropTypes, Component } from 'react';
import * as bs from 'react-bootstrap';
import { Link } from 'react-router';
import moment from 'moment';

import { episodeShape } from '../propTypes';

import Loader from './Loader';
import EpisodeButtons from './EpisodeButtons';
import Labels from './Labels';
import { sanitize } from './utils';

import defaultThumbnail from './podcast.svg';

class EpisodeDetail extends Component {

  render() {
    const {
      loading,
      error,
      episode,
    } = this.props;

    if (error) {
      return (
        <bs.Jumbotron>
          <h2>Podcast not found</h2>
          <p>Sorry, this podcast cannot be found.</p>
        </bs.Jumbotron>
      );
    }

    if (loading || !episode) {
      return <Loader />;
    }

    const { channel } = episode;

    const description = sanitize(
      episode.description || episode.summary || episode.subtitle || ''
    );

    const thumbnail = channel.thumbnail || {
      url: defaultThumbnail,
      height: 120,
      width: 120,
    };

    const published = episode.published && moment(episode.published).format(
      'MMMM Do YYYY'
    );

    const buttons = <EpisodeButtons {...this.props} />;

    return (
      <div>
        <div className="page-header">
          <h2>{episode.title}</h2>
          <h3><Link to={`/feeds/${channel.id}/`}>{channel.name}</Link></h3>
        </div>
        <bs.Panel footer={buttons}>
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
          <p className="episode-description" style={{ marginTop: 10 }}
             dangerouslySetInnerHTML={description}></p>
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
