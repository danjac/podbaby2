import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { playingEpisodeSelector } from '../selectors';
import { episodePropTypes } from '../prop-types';
import Player from '../components/Player';

import { bindEpisodeActionCreators } from './utils';

export class PlayerContainer extends Component {
  render() {
    return <Player {...this.props} />;
  }
}

PlayerContainer.propTypes = {
  ...episodePropTypes,
  currentTime: PropTypes.number.isRequired,
  authenticated: PropTypes.bool.isRequired,
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

const mapDispatchToProps = dispatch => bindEpisodeActionCreators(dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayerContainer);
