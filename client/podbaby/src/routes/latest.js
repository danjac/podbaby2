import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { fetchEpisodes } from '../modules/episodes';
import { addBookmark, removeBookmark } from '../modules/auth';
import { startPlayer, stopPlayer } from '../modules/player';

import { episodesSelector } from '../selectors';
import { parsePageNumberFromUrl } from '../utils/pagination';

import Loader from '../components/loader';
import EpisodeList from '../components/episode-list';

class LatestEpisodes extends Component {

  constructor(props) {
    super(props);
    this.handleSelectPage = this.handleSelectPage.bind(this);
    this.handleStartPlayer = this.handleStartPlayer.bind(this);
    this.handleStopPlayer = this.handleStopPlayer.bind(this);
    this.handleAddBookmark = this.handleAddBookmark.bind(this);
    this.handleRemoveBookmark = this.handleRemoveBookmark.bind(this);
  }

  componentDidMount() {
    const { page, q } = this.props.location.query;
    this.fetchEpisodes(page || 1, q);
  }

  componentWillReceiveProps(nextProps) {

    const thisQuery = this.props.location.query;
    const nextQuery = nextProps.location.query;

    if (thisQuery !== nextQuery) {
      const { page, q } = nextQuery;
      this.fetchEpisodes(page, q);
    }
  }

  fetchEpisodes(page, searchQuery) {
    let url = '/api/episodes/?page=' + page;
    if (searchQuery) {
      url += '&q=' + searchQuery;
    }
    this.props.actions.onFetchEpisodes(url);
  }

  handleSelectPage(url) {
    const page = parsePageNumberFromUrl(url);
    this.props.router.replace({
      query: {
        page: page,
      }
    });
  }

  handleStartPlayer(episode) {
    this.props.actions.onStartPlayer(episode);
  }

  handleStopPlayer(episode) {
    this.props.actions.onStopPlayer(episode);
  }

  handleAddBookmark(episode) {
    this.props.actions.onAddBookmark(episode);
  }

  handleRemoveBookmark(episode) {
    this.props.actions.onRemoveBookmark(episode);
  }

  render() {

    const {
      episodes,
      next,
      previous,
      isLoggedIn,
      isLoading } = this.props;

    if (isLoading) {
      return <Loader />;
    }

    return (
        <EpisodeList episodes={episodes}
                     next={next}
                     previous={previous}
                     isLoggedIn={isLoggedIn}
                     onSelectPage={this.handleSelectPage}
                     onStartPlayer={this.handleStartPlayer}
                     onStopPlayer={this.handleStopPlayer}
                     onAddBookmark={this.handleAddBookmark}
                     onRemoveBookmark={this.handleRemoveBookmark} />
    );
  }
}

LatestEpisodes.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  episodes: PropTypes.array.isRequired,
  next: PropTypes.string,
  previous: PropTypes.string,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
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
  } = state;

  const episodes = episodesSelector(state);

  return {
    episodes,
    next,
    previous,
    isLoading,
    isLoggedIn,
  };

};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({
      onFetchEpisodes: fetchEpisodes,
      onStartPlayer: startPlayer,
      onStopPlayer: stopPlayer,
      onAddBookmark: addBookmark,
      onRemoveBookmark: removeBookmark,
    }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(LatestEpisodes));
