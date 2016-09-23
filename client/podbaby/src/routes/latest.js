import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { startPlayer, stopPlayer } from '../modules/player';
import { fetchEpisodes } from '../modules/episodes';
import EpisodeList from '../components/episode-list';
import { parsePageNumberFromUrl } from '../utils/pagination';
import { episodesSelector } from '../selectors';

class LatestEpisodes extends Component {

  constructor(props) {
    super(props);
    this.handleSelectPager = this.handleSelectPager.bind(this);
  }

  componentDidMount() {
    this.fetchEpisodes(this.props.location.query.page || 1);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.query.page &&
      nextProps.location.query.page !== this.props.location.query.page) {
      this.fetchEpisodes(nextProps.location.query.page);
    }
  }

  handleSelectPager(url) {
    const page = parsePageNumberFromUrl(url);
    this.props.router.replace({ query: { page } });
  }

  fetchEpisodes(page=1) {
    this.props.actions.fetchEpisodes('/api/episodes/?page=' + page);
  }

  render() {
    const { actions: { startPlayer, stopPlayer } } = this.props;
    return (
      <EpisodeList onStartPlayer={startPlayer}
                   onStopPlayer={stopPlayer}
                   onSelectPager={this.handleSelectPager} {...this.props} />);
  }
}

LatestEpisodes.propTypes = {
  actions: PropTypes.object.isRequired,
  episodes: PropTypes.array.isRequired,
  next: PropTypes.string,
  previous: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  player: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const {
    episodes: {
      next,
      previous,
      isLoading
    },
    auth: {
      isLoggedIn,
    },
    player,
  } = state;

  const episodes = episodesSelector(state);

  return {
    episodes,
    next,
    previous,
    isLoading,
    isLoggedIn,
    player,
  };

};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({
      startPlayer,
      stopPlayer,
      fetchEpisodes,
    }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps)(withRouter(LatestEpisodes));
