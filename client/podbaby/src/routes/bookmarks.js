import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { fetchEpisodes } from '../modules/episodes';

import EpisodeList from '../components/episode-list';

import { episodesSelector } from '../selectors';


class Bookmarks extends Component {

  constructor(props) {
    super(props);
    this.fetchEpisodes = this.fetchEpisodes.bind(this);
  }

  fetchEpisodes(page=1, searchQuery) {
    let url = '/api/episodes/bookmarks/?page=' + page;
    if (searchQuery) {
      url += '&q=' + searchQuery;
    }
    this.props.dispatch(fetchEpisodes(url));
  }

  render() {
    return (
      <EpisodeList fetchEpisodes={this.fetchEpisodes}
                   {...this.props} />
    );
  }
}

Bookmarks.propTypes = {
  episodes: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  next: PropTypes.string,
  previous: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
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

export default connect(mapStateToProps)(withRouter(Bookmarks));
