import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { fetchPlayedEpisodes } from '../../actions/episodes';
import { clearHistory } from '../../actions/history';
import { episodesSelector } from '../../selectors';
import HistoryPage from '../../components/HistoryPage';

import withPaginatedSearch from '../../components/hoc/withPaginatedSearch';
import { bindEpisodeActionCreators } from '../utils';

export class History extends Component {

  constructor(props) {
    super(props);
    this.handleClearHistory = this.handleClearHistory.bind(this);
  }

  handleClearHistory() {
    this.props.dispatch(clearHistory());
  }

  // tbd handle onClearHistory action
  render() {
    return <HistoryPage {...this.props} onClearHistory={this.handleClearHistory} />;
  }
}

History.propTypes = {
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
)(withRouter(withPaginatedSearch(fetchData)(History)));
