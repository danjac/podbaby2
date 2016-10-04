import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { fetchEpisodes } from '../modules/episodes';
import { episodesSelector } from '../selectors';

import EpisodeList from '../components/episode-list';

class LatestEpisodes extends Component {

  constructor(props) {
    super(props);
    this.handleSelectPage = this.handleSelectPage.bind(this);
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

  handleSelectPage() {
  }

  handleStartPlayer() {
  }

  handleStopPlayer() {
  }

  handleAddBookmark() {
  }

  handleRemoveBookmark() {
  }

  render() {

    const { episodes, next, previous } = this.props;

    return (
        <EpisodeList episodes={episodes}
                     next={next}
                     previous={previous}
                     onSelectPage={this.handleSelectPage}
                     onStartPlayer={this.handleStartPlayer}
                     onStopPlayer={this.handleStopPlayer}
                     onAddBookmark={this.handleAddBookmark}
                     onRemoveBookmark={this.handleRemoveBookmark} />
    );
  }
}

LatestEpisodes.propTypes = {
  episodes: PropTypes.array.isRequired,
  next: PropTypes.string,
  previous: PropTypes.string,
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
    }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(LatestEpisodes));
