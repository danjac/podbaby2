import React, { Component } from 'react';
import { connect } from 'react-redux';

import { episodeShape } from '../../propTypes';
import { playingEpisodeSelector } from '../../selectors';
import { updatePlayerCurrentTime } from '../../actions/player';
import Player from '../../components/Player';

import { bindEpisodeActionCreators } from '../utils';

export class PlayerContainer extends Component {

  constructor(props) {
    super(props);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
  }

  handleTimeUpdate(currentTime) {
    updatePlayerCurrentTime(this.props.episode, currentTime);
  }

  render() {
    return <Player {...this.props} onTimeUpdate={this.handleTimeUpdate} />;
  }
}

PlayerContainer.propTypes = {
  episode: episodeShape,
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
