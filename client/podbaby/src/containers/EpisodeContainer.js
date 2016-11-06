import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { episodeActionPropTypes } from '../prop-types';
import { episodeSelector } from '../selectors';
import { fetchEpisode } from '../actions/episode';
import EpisodeDetail from '../components/EpisodeDetail';

import { bindEpisodeActions } from './utils';

export class EpisodeContainer extends Component {
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
    this.props.onFetchEpisode(id);
  }

  render() {
    return <EpisodeDetail {...this.props} />;
  }

}

EpisodeContainer.propTypes = {
  params: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  ...episodeActionPropTypes,
};

const mapStateToProps = state => {
  const {
    auth: {
      authenticated,
    },
    episode: {
      error,
      loading,
    },
  } = state;
  return {
    episode: episodeSelector(state),
    authenticated,
    loading,
    error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindEpisodeActions(dispatch),
    ...bindActionCreators({
      onFetchEpisode: fetchEpisode,
    }, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(EpisodeContainer));
