import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { fetchAllChannels } from '../actions/channels';
import { channelsSelector } from '../selectors';
import Channels from '../components/Channels';

import withPaginatedSearch from './withPaginatedSearch';
import { bindChannelActionCreators } from './utils';

class ChannelsContainer extends Component {
  render() {
    return <Channels header='All feeds' {...this.props} />;
  }
}

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
)(withRouter(withPaginatedSearch(fetchData)(ChannelsContainer)));
