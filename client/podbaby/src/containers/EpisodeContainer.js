import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { episodeSelector } from '../selectors';
import { fetchEpisode } from '../actions/episode';
import EpisodeDetail from '../components/EpisodeDetail';

import { bindEpisodeActionCreators } from './utils';

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
    this.props.dispatch(fetchEpisode(id));
  }

  render() {
    return <EpisodeDetail {...this.props} />;
  }

}

EpisodeContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
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
    ...bindEpisodeActionCreators(dispatch),
    ...bindActionCreators({
      onFetchEpisode: fetchEpisode,
    }, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(EpisodeContainer));
