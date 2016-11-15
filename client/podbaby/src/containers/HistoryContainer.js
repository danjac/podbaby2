import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { fetchPlayedEpisodes } from '../actions/episodes';
import { clearHistory } from '../actions/history';
import { episodesSelector } from '../selectors';
import History from '../components/History';

import withPaginatedSearch from './withPaginatedSearch';
import { bindEpisodeActionCreators } from './utils';

export class HistoryContainer extends Component {

  constructor(props) {
    super(props);
    this.handleClearHistory = this.handleClearHistory.bind(this);
  }

  handleClearHistory() {
    this.props.dispatch(clearHistory());
  }

  // tbd handle onClearHistory action
  render() {
    return <History {...this.props} onClearHistory={this.handleClearHistory} />;
  }
}

HistoryContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
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
  fetchPlayedEpisodes(page, searchQuery)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(withPaginatedSearch(fetchData)(HistoryContainer)));
