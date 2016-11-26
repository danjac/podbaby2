import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { fetchAllEpisodes } from '../../actions/episodes';
import { episodesSelector } from '../../selectors';
import EpisodesPage from '../../components/EpisodesPage';

import withPaginatedSearch from '../../components/hoc/withPaginatedSearch';
import { bindEpisodeActionCreators } from '../utils';

export class Episodes extends Component {

  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate() {
    this.props.dispatch(fetchAllEpisodes());
  }

  render() {

    return <EpisodesPage header='All podcasts'
                         onUpdate={this.handleUpdate} {...this.props} />;
  }
}

Episodes.propTypes = {
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

const fetchData = (dispatch, page, searchQuery) => dispatch(fetchAllEpisodes(page, searchQuery));

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(withPaginatedSearch(fetchData)(Episodes)));
