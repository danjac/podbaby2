import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { fetchSubscribedEpisodes } from '../actions/episodes';
import { episodesSelector } from '../selectors';
import Episodes from '../components/Episodes';

import withPaginatedSearch from './withPaginatedSearch';
import { bindEpisodeActionCreators } from './utils';

export class UserEpisodesContainer extends Component {

  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate() {
    this.props.dispatch(fetchSubscribedEpisodes());
  }

  render() {

    return <Episodes header='My podcasts'
                     onUpdate={this.handleUpdate} {...this.props} />;
  }
}

UserEpisodesContainer.propTypes = {
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
)(withRouter(withPaginatedSearch(fetchData)(UserEpisodesContainer)));
