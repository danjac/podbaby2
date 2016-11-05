import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { playingEpisodeSelector } from '../selectors';
import Player from '../components/Player';

import { episodeActionPropTypes } from './prop-types';
import { bindEpisodeActions } from './utils';

export class PlayerContainer extends Component {
  render() {
    return <Player {...this.props} />;
  }
}

PlayerContainer.propTypes = {
  episode: PropTypes.object,
  currentTime: PropTypes.number.isRequired,
  authenticated: PropTypes.bool.isRequired,
  ...episodeActionPropTypes,
};


const mapStateToProps = state => {
  const {
    player: { currentTime },
    auth: { authenticated },
  } = state;
  return {
    episode: playingEpisodeSelector(state),
    currentTime,
    authenticated,
  };
};

const mapDispatchToProps = dispatch => bindEpisodeActions(dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayerContainer);
