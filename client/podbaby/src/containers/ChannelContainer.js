import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { fetchChannel, fetchEpisodesForChannel } from '../actions/channel';
import { channelSelector, channelEpisodesSelector } from '../selectors';

import { searchPropTypes, channelPropTypes } from '../propTypes';

import ChannelDetail from '../components/ChannelDetail';

import paginatedSearch from './paginatedSearch';

import { bindEpisodeActionCreators } from './utils';

export class ChannelContainer extends Component {

  componentDidMount() {
    this.fetchChannel(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.fetchChannel(nextProps.params.id);
    }
    return nextProps;
  }

  fetchChannel(id) {
    this.props.dispatch(fetchChannel(id));
  }

  render() {
    return <ChannelDetail {...this.props} />;
  }
}

ChannelContainer.propTypes = {
  ...channelPropTypes,
  ...searchPropTypes,
  params: PropTypes.object.isRequired,
  channelLoading: PropTypes.bool.isRequired,
  episodesLoading: PropTypes.bool.isRequired,
};


const mapStateToProps = state => {
  const {
    auth: { authenticated },
    episodes: {
      next,
      previous,
    },
  } = state;

  const channelLoading = state.channel.loading;
  const episodesLoading = state.episodes.loading;

  return {
    channel: channelSelector(state),
    episodes: channelEpisodesSelector(state),
    authenticated,
    next,
    previous,
    episodesLoading,
    channelLoading,
  };
};

const mapDispatchToProps = dispatch => bindEpisodeActionCreators(dispatch);

const fetchEpisodes = (dispatch, page, searchQuery, { id }) => dispatch(
  fetchEpisodesForChannel(id, page, searchQuery)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(paginatedSearch(fetchEpisodes)(ChannelContainer)));
