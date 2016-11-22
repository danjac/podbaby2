import React, { Component } from 'react';
import { connect } from 'react-redux';

import { episodeShape } from '../../propTypes';
import { playingEpisodeSelector } from '../../selectors';
import { updatePlayerCurrentTime } from '../../actions/player';
import AudioPlayer from '../../components/AudioPlayer';

import { bindEpisodeActionCreators } from '../utils';

export class Player extends Component {

  constructor(props) {
    super(props);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
  }

  handleTimeUpdate(currentTime) {
    updatePlayerCurrentTime(this.props.episode, currentTime);
  }

  render() {
    return <AudioPlayer {...this.props} onTimeUpdate={this.handleTimeUpdate} />;
  }
}

Player.propTypes = {
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
)(Player);
