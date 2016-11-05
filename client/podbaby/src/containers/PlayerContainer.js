import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { playingEpisodeSelector } from '../selectors';
import { addBookmark, removeBookmark } from '../actions/bookmarks';
import { startPlayer, stopPlayer } from '../actions/player';
import { subscribe, unsubscribe } from '../actions/subscriptions';

import Player from '../components/Player';

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

const mapDispatchToProps = state => {
  return bindActionCreators({
    onAddBookmark: addBookmark,
    onRemoveBookmark: removeBookmark,
    onStopPlayer: stopPlayer,
    onStartPlayer: startPlayer,
    onSubscribe: subscribe,
    onUnsubscribe: unsubscribe,
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayerContainer);
