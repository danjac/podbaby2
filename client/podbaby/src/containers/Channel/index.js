import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { fetchChannel, fetchEpisodesForChannel } from '../../actions/channel';
import { channelSelector, episodesSelector } from '../../selectors';
import { bindEpisodeActionCreators } from '../../actions';
import ChannelDetail from '../../components/ChannelDetail';

import withPaginatedSearch from '../../components/hoc/withPaginatedSearch';


export class Channel extends Component {

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

Channel.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
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
    episodes: episodesSelector(state),
    authenticated,
    next,
    previous,
    episodesLoading,
    channelLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  dispatch,
  ...bindEpisodeActionCreators(dispatch),
});

const fetchEpisodes = (dispatch, page, searchQuery, { id }) => dispatch(
  fetchEpisodesForChannel(id, page, searchQuery)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(withPaginatedSearch(fetchEpisodes)(Channel)));
