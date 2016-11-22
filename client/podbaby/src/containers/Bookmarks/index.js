import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { fetchBookmarkedEpisodes } from '../../actions/episodes';
import { episodesSelector } from '../../selectors';
import BookmarksPage from '../../components/BookmarksPage';

import withPaginatedSearch from '../withPaginatedSearch';
import { bindEpisodeActionCreators } from '../utils';

export class Bookmarks extends Component {

  render() {
    return <BookmarksPage {...this.props} />;
  }
}

const mapStateToProps = state => {
  const {
    auth: { authenticated },
    episodes: {
      next,
      previous,
      loading,
    },
  } = state;

  return {
    episodes: episodesSelector(state),
    authenticated,
    next,
    previous,
    loading,
  };
};

const mapDispatchToProps = dispatch => bindEpisodeActionCreators(dispatch);

const fetchData = (dispatch, page, searchQuery) => dispatch(
  fetchBookmarkedEpisodes(page, searchQuery)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(withPaginatedSearch(fetchData)(Bookmarks)));
