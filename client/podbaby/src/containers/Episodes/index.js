import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { fetchAllEpisodes } from '../../actions/episodes';
import { episodesSelector } from '../../selectors';

import withPaginatedSearch from '../../components/hoc/withPaginatedSearch';
import { bindEpisodeActionCreators } from '../../actions';

import Episodes from './Episodes';

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
