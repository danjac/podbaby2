import { connect } from 'react-redux';

import { playingEpisodeSelector } from '../../selectors';
import { bindEpisodeActionCreators } from '../../actions';

import Player from './Player';


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
