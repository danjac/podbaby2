import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { fetchBookmarkedEpisodes } from '../actions/episodes';
import { episodesSelector } from '../selectors';
import { episodesPropTypes, searchPropTypes } from '../propTypes';
import Bookmarks from '../components/Bookmarks';

import paginatedSearch from './paginatedSearch';
import { bindEpisodeActionCreators } from './utils';

export class BookmarksContainer extends Component {

  render() {
    return <Bookmarks {...this.props} />;
  }
}

BookmarksContainer.propTypes = {
  ...episodesPropTypes,
  ...searchPropTypes,
  loading: PropTypes.bool.isRequired,
};


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
)(withRouter(paginatedSearch(fetchData)(BookmarksContainer)));
