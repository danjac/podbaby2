import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { fetchSubscribedEpisodes } from '../../actions/episodes';
import { episodesSelector } from '../../selectors';
import EpisodesPage from '../../components/EpisodesPage';

import withPaginatedSearch from '../../components/hoc/withPaginatedSearch';
import { bindEpisodeActionCreators } from '../../actions';

export class UserEpisodes extends Component {

  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate() {
    this.props.dispatch(fetchSubscribedEpisodes());
  }

  render() {

    return <EpisodesPage header='My podcasts'
                         onUpdate={this.handleUpdate} {...this.props} />;
  }
}

UserEpisodes.propTypes = {
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
  fetchSubscribedEpisodes(page, searchQuery)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(withPaginatedSearch(fetchData)(UserEpisodes)));
