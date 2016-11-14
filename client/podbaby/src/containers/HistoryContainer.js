import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { fetchPlayedEpisodes } from '../actions/episodes';
import { episodesSelector } from '../selectors';
import History from '../components/History';

import withPaginatedSearch from './withPaginatedSearch';
import { bindEpisodeActionCreators } from './utils';

export class HistoryContainer extends Component {

  // tbd handle onClearHistory action
  render() {
    return <History {...this.props} />;
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
  fetchPlayedEpisodes(page, searchQuery)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(withPaginatedSearch(fetchData)(HistoryContainer)));
