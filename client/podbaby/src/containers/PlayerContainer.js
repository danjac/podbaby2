import React, { Component } from 'react';
import { connect } from 'react-redux';

import { playingEpisodeSelector } from '../selectors';
import Player from '../components/Player';

import { bindEpisodeActionCreators } from './utils';

export class PlayerContainer extends Component {
  render() {
    return <Player {...this.props} />;
  }
}

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
