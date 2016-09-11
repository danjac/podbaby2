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
    this.onSelectPager = this.onSelectPager.bind(this);

  }

  componentDidMount() {
    this.fetchEpisodes();
  }

  onSelectPager(url) {
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
      <Pager next={next} previous={previous} onSelect={this.onSelectPager} /> : '';

    return (
      <div>
          {pager}
          {results.map(episode => (
          <Episode key={episode.id}
                   episode={episode}
                   startPlayer={this.props.actions.startPlayer}
                   stopPlayer={this.props.actions.stopPlayer}
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
}

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
