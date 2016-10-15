import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import moment from 'moment';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';

import { episodeDetailSelector } from '../../selectors';

import Categories from '../../components/categories';
import Buttons from '../../components/episode-buttons';
import Loader from '../../components/loader';

import sanitize from '../../utils/sanitize';

import { fetchEpisode } from '../../modules/episode';

import { startPlayer, stopPlayer } from '../../modules/player';

import {
  addBookmark,
  removeBookmark,
  subscribe,
  unsubscribe,
} from '../../modules/auth';

import defaultThumbnail from '../../podcast.svg';


export class EpisodeDetail extends Component {

  componentDidMount() {
    this.fetchEpisode(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.fetchEpisode(nextProps.params.id);
    }
    return nextProps;
  }

  fetchEpisode(id) {
    this.props.actions.onFetchEpisode(id);
  }

  render() {
    const {
      isLoggedIn,
      isLoading,
      notFound,
      episode,
      actions,
    } = this.props;

    if (notFound) {
      return (
        <bs.Jumbotron>
          <h2>Podcast not found</h2>
          <p>Sorry, this podcast cannot be found.</p>
        </bs.Jumbotron>
      );
    }

    if (isLoading || !episode) {
      return <Loader />;
    }

    const { channel } = episode;

    const description = sanitize(
      episode.description || episode.summary || episode.subtitle
    );

    const thumbnail = channel.thumbnail || {
      url: defaultThumbnail,
      height: 120,
      width: 120,
    };

    const published = episode.published && moment(episode.published).format(
      'MMMM Do YYYY'
    );

    const buttons = (
      <Buttons episode={episode}
                isLoggedIn={isLoggedIn}
                {...actions} />

    );
    return (
      <div>
        <div className="page-header">
          <h2>{episode.title}</h2>
          <h3><a href="#">{channel.name}</a></h3>
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
              <Categories categories={channel.categories}
                explicit={episode.explicit} />
              {published && <p><strong>{published}</strong></p>}
              {episode.link && (
              <p>
                <a href={episode.link} className="btn btn-default btn-sm">
                  <Icon name="globe" /> Link to episode
                </a>
              </p>
              )}
            </bs.Media.Body>
          </bs.Media>
        </bs.Panel>
        <p className="episode-description" style={{ marginTop: 10 }}
           dangerouslySetInnerHTML={description}></p>
      </div>
    );

    }
}

EpisodeDetail.propTypes = {
  params: PropTypes.object.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  notFound: PropTypes.bool.isRequired,
  episode: PropTypes.any,
};

const mapStateToProps = state => {
  const { isLoggedIn } = state.auth;
  const { isLoading, notFound } = state.episode;
  return {
    isLoggedIn,
    isLoading,
    notFound,
    episode: episodeDetailSelector(state),
  };
};


const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({
      onFetchEpisode: fetchEpisode,
      onStartPlayer: startPlayer,
      onStopPlayer: stopPlayer,
      onAddBookmark: addBookmark,
      onRemoveBookmark: removeBookmark,
      onSubscribe: subscribe,
      onUnsubscribe: unsubscribe,
    }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(EpisodeDetail));
