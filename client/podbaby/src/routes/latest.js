import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { startPlayer, stopPlayer } from '../modules/player';
import { fetchEpisodes } from '../modules/episodes';
import { parsePageNumberFromUrl } from '../pagination';
import Pager from '../components/pager';
import Episode from '../components/episode';

class LatestEpisodes extends Component {

  constructor(props) {
    super(props);

    this.handleSelectPager = this.handleSelectPager.bind(this);
    this.handleStartPlayer = this.handleStartPlayer.bind(this);
    this.handleStopPlayer = this.handleStopPlayer.bind(this);

  }

  componentDidMount() {
    this.fetchEpisodes();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.query.page !== this.props.location.query.page) {
      this.fetchEpisodes(null, nextProps);
    }
  }

  handleStartPlayer(event) {
    event.preventDefault();
    this.props.actions.startPlayer();
  }

  handleStopPlayer(event) {
    event.preventDefault();
    this.props.actions.stopPlayer();
  }

  handleSelectPager(url) {
    this.fetchEpisodes(url);
  }

  fetchEpisodes(url, props) {

    props = props || this.props;

    if (url) {
      props.router.replace({ query: { page: parsePageNumberFromUrl(url) } });
    } else {
      const page = props.location.query.page || 1;
      url = '/api/episodes/?page=' + page;
    }

    this.props.actions.fetchEpisodes(url);
  }

  render() {

    if (this.props.isLoading) {
        return <h1>Waiting...</h1>;
    }

    const { next, previous, results } = this.props;

    const pager = (previous || next) ?
      <Pager next={next} previous={previous} onSelect={this.handleSelectPager} /> : '';

    return (
      <div>
          {pager}
          {results.map(episode => (
          <Episode key={episode.id}
                   episode={episode}
                   onStart={this.handleStartPlayer}
                   onStop={this.handleStopPlayer}
                   player={this.props.player} />
          ))}
          {pager}
      </div>
    );
  }
}

LatestEpisodes.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  results: PropTypes.array.isRequired,
  next: PropTypes.string,
  previous: PropTypes.string,
  actions: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { episodes: { isLoading, next, previous, results }, player } = state;
  return {
    player,
    next,
    previous,
    results,
    isLoading,
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LatestEpisodes));
