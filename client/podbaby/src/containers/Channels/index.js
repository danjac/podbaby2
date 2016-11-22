import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { fetchAllChannels } from '../actions/channels';
import { channelsSelector } from '../selectors';
import ChannelsPage from '../components/ChannelsPage';

import withPaginatedSearch from './withPaginatedSearch';
import { bindChannelActionCreators } from './utils';

class Channels extends Component {
  render() {
    return <ChannelsPage header='All feeds' {...this.props} />;
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
)(withRouter(withPaginatedSearch(fetchData)(Channels)));
