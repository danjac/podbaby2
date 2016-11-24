import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { fetchAllChannels } from '../../actions/channels';
import { bindChannelActionCreators } from '../../actions';
import { channelsSelector } from '../../selectors';

import withPaginatedSearch from '../withPaginatedSearch';

import Channels from './Channels';

const fetchData = (dispatch, page, searchQuery) => dispatch(fetchAllChannels(page, searchQuery));

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
)(withRouter(withPaginatedSearch(fetchData)(Channels)));
