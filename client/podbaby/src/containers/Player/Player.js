import React, { Component } from 'react';

import { episodeShape } from '../../propTypes';
import { updatePlayerCurrentTime } from '../../actions/player';
import AudioPlayer from '../../components/AudioPlayer';


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

export default Player;
