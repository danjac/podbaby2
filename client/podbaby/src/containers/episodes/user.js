import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
// import * as bs from 'react-bootstrap';

import { fetchSubscribed } from '../../modules/episodes';

import {
  addBookmark,
  removeBookmark,
  subscribe,
  unsubscribe,
} from '../../modules/auth';

import { startPlayer, stopPlayer } from '../../modules/player';

import { episodesSelector } from '../../selectors';

import Search from '../../components/search';
import Loader from '../../components/loader';
import EpisodeList from '../../components/episode-list';

export class Episodes extends Component {

  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleClearSearch = this.handleClearSearch.bind(this);
    this.handleSelectPage = this.handleSelectPage.bind(this);

  }

  componentDidMount() {
    const { page, q } = this.props.location.query;
    this.fetchEpisodes(page || 1, q);
  }

  componentWillReceiveProps(nextProps) {

    const thisQuery = this.props.location.query;
    const nextQuery = nextProps.location.query;

    if (thisQuery !== nextQuery) {
      const { page, q } = nextQuery;
      this.fetchEpisodes(page, q);
    }
  }

  fetchEpisodes(page=1, searchQuery, show) {
    const { actions: { onFetchSubscribed } } = this.props;
    onFetchSubscribed(page, searchQuery);
  }

  changeLocation(nextQuery) {
    const query = {...this.props.location.query, ...nextQuery};
    this.props.router.replace({ ...this.props.location, query });
  }

  handleSearch(searchQuery) {
    this.changeLocation({ page: 1, q: searchQuery });
  }

  handleClearSearch() {
    this.changeLocation({ page: 1, q: '' });
  }

  handleSelectPage(page) {
    this.changeLocation({ page });
  }

  render() {

    const {
      episodes,
      next,
      previous,
      isLoading,
      actions,
      location: {
        query
      }
    } = this.props;

    if (isLoading) {
      return <Loader />;
    }

    const searchQuery = query.q;

    const ifEmpty = searchQuery && 'No podcasts found for your search.';

    return (
      <div>
        <div className="page-header">
          <h2>My feeds</h2>
        </div>
        <Search placeholder="Search for podcasts"
                searchQuery={searchQuery}
                onClear={this.handleClearSearch}
                onSearch={this.handleSearch} />

        <EpisodeList episodes={episodes}
                     next={next}
                     previous={previous}
                     ifEmpty={ifEmpty}
                     isLoggedIn={true}
                     onSelectPage={this.handleSelectPage}
                     {...actions} />
      </div>
    );
  }
}

Episodes.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  episodes: PropTypes.array.isRequired,
  next: PropTypes.string,
  previous: PropTypes.string,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  const {
    episodes: {
      next,
      previous,
      isLoading
    },
  } = state;

  const episodes = episodesSelector(state);

  return {
    episodes,
    next,
    previous,
    isLoading,
  };

};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({
      onFetchSubscribed: fetchSubscribed,
      onStartPlayer: startPlayer,
      onStopPlayer: stopPlayer,
      onAddBookmark: addBookmark,
      onRemoveBookmark: removeBookmark,
      onSubscribe: subscribe,
      onUnsubscribe: unsubscribe,
    }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Episodes));
