import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Icon from 'react-fa';
import moment from 'moment';
import * as bs from 'react-bootstrap';

import { episodeDetailSelector } from '../selectors';
import Buttons from '../components/episode-buttons';
import Loader from '../components/loader';
import sanitize from '../utils/sanitize';

import { fetchEpisode } from '../modules/episode';

import { startPlayer, stopPlayer } from '../modules/player';

import {
  addBookmark,
  removeBookmark,
  subscribe,
  unsubscribe,
} from '../modules/auth';

import defaultThumbnail from '../podcast.svg';


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
      isNotFound,
      episode,
      actions,
    } = this.props;

    if (isNotFound) {
      return <div>Not found</div>;
    }

    if (isLoading || !episode) {
      return <Loader />;
    }

    const { channel } = episode;

    const description = sanitize(
      episode.description || episode.summary || episode.subtitle
    );

    let categories = channel.categories.map(cat => (
      <a href="#" key={cat.id}><bs.Label style={{ display: 'inline-block' }}>{cat.name}</bs.Label>&nbsp;</a>
    ));

    if (episode.explicit) {
      categories = [...categories, [(
        <bs.Label key="explicit" bsStyle="danger" style={{ display: 'inline-block' }}>
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
      <div>
        <div style={{ textAlign: 'center' }}>
          <h2>{episode.title}</h2>
          <h3><a href="#">{channel.name}</a></h3>
        </div>
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
           dangerouslySetInnerHTML={description}></p>
         <Buttons episode={episode}
                  isLoggedIn={isLoggedIn}
                  {...actions} />
      </div>
    );

    }
}

EpisodeDetail.propTypes = {
  params: PropTypes.object.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isNotFound: PropTypes.bool.isRequired,
  episode: PropTypes.any,
};

const mapStateToProps = state => {
  const { isLoggedIn } = state.auth;
  const { isLoading, isNotFound } = state.episode;
  return {
    isLoggedIn,
    isLoading,
    isNotFound,
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
