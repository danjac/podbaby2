import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { fetchChannelsForCategory } from '../../actions/category';
import { channelsSelector } from '../../selectors';

import withPaginatedSearch from '../../components/hoc/withPaginatedSearch';
import { bindChannelActionCreators } from '../../actions';

import Category from './Category';

const mapStateToProps = state => {
  const {
    auth: { authenticated },
    category: {
      category,
      error,
    },
    channels: {
      next,
      previous,
    },
  } = state;

  const categoryLoading = state.category.loading;
  const channelsLoading = state.channels.loading;

  return {
    channels: channelsSelector(state),
    category,
    authenticated,
    next,
    previous,
    error,
    channelsLoading,
    categoryLoading,
  };
};

const mapDispatchToProps = dispatch => bindChannelActionCreators(dispatch);

const fetchChannels = (dispatch, page, searchQuery, { id }) => dispatch(
  fetchChannelsForCategory(id, page, searchQuery)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(withPaginatedSearch(fetchChannels)(Category)));
