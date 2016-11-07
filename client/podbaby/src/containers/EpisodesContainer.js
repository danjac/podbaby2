import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { fetchAllEpisodes } from '../actions/episodes';
import { episodesSelector } from '../selectors';
import { episodesPropTypes } from '../propTypes';
import Episodes from '../components/Episodes';

import paginatedSearch from './paginatedSearch';
import { bindEpisodeActionCreators } from './utils';

export class EpisodesContainer extends Component {

  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate() {
    this.props.dispatch(fetchAllEpisodes());
  }

  render() {

    const canUpdate = !this.props.searchQuery && !this.props.previous;

    return <Episodes onUpdate={this.handleUpdate}
                     canUpdate={canUpdate} {...this.props} />;
  }
}

EpisodesContainer.propTypes = {
  ...episodesPropTypes,
  searchQuery: PropTypes.string,
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

const fetchData = (dispatch, page, searchQuery) => dispatch(fetchAllEpisodes(page, searchQuery));

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(paginatedSearch(fetchData)(EpisodesContainer)));
