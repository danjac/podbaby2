import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { fetchSubscribedChannels } from '../../actions/channels';
import { channelsSelector } from '../../selectors';

import withPaginatedSearch from '../withPaginatedSearch';
import { bindChannelActionCreators } from '../utils';

import Subscriptions from './Subscriptions';

const fetchData = (dispatch, page, searchQuery) => dispatch(fetchSubscribedChannels(page, searchQuery));

const mapStateToProps = state => {

  const {
    auth: { authenticated },
    channels: {
      next,
      previous,
      loading,
    },
  } = state;

  return {
    channels: channelsSelector(state),
    authenticated,
    next,
    previous,
    loading,
  };

};

const mapDispatchToProps = dispatch => bindChannelActionCreators(dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(withPaginatedSearch(fetchData)(Subscriptions)));
