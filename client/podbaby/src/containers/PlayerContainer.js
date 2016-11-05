import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { playingEpisodeSelector } from '../selectors';
import Player from '../components/Player';
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
  onAddBookmark: PropTypes.func.isRequired,
  onRemoveBookmark: PropTypes.func.isRequired,
  onStopPlayer: PropTypes.func.isRequired,
  onStartPlayer: PropTypes.func.isRequired,
  onSubscribe: PropTypes.func.isRequired,
  onUnsubscribe: PropTypes.func.isRequired,
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
