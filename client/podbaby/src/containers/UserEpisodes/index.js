import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { bindEpisodeActionCreators } from '../../actions';
import { fetchSubscribedEpisodes } from '../../actions/episodes';
import { episodesSelector } from '../../selectors';
import withPaginatedSearch from '../../components/hoc/withPaginatedSearch';

import UserEpisodes from './UserEpisodes';

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
