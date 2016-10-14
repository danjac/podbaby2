import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { fetchEpisodes } from '../modules/episodes';

import {
  addBookmark,
  removeBookmark,
  subscribe,
  unsubscribe,
} from '../modules/auth';

import { startPlayer, stopPlayer } from '../modules/player';

import { episodesSelector } from '../selectors';
import { pageNumberFromUrl } from '../utils/pagination';

import Search from '../components/search';
import Loader from '../components/loader';
import EpisodeList from '../components/episode-list';

class Bookmarks extends Component {

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

  fetchEpisodes(page, searchQuery) {
    const params = {
      page: page || 1,
      q: searchQuery || '',
    };
    this.props.actions.onFetchEpisodes('/api/episodes/bookmarks/', params);
  }

  changeLocation(page, searchQuery) {
    this.props.router.replace({
      query: {
        page,
        q: searchQuery,
      },
      pathname: this.props.location.pathname,
    });
 }

  handleSearch(searchQuery) {
    this.changeLocation(1, searchQuery);
  }

  handleClearSearch() {
    this.changeLocation(1, '');
  }

  handleSelectPage(url) {
    const page = pageNumberFromUrl(url);
    this.changeLocation(page, this.props.location.query.q);
  }

  render() {

    const {
      episodes,
      next,
      previous,
      isLoading,
      actions } = this.props;

    if (isLoading) {
      return <Loader />;
    }

    const searchQuery = this.props.location.query.q;

    const ifEmpty = (
      searchQuery ? 'No podcasts found for your search.' :
        "You haven't added any podcasts to your playlist yet"
    );

    return (
      <div>
        <Search placeholder="Search for podcasts in your playlist"
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

Bookmarks.propTypes = {
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
      onFetchEpisodes: fetchEpisodes,
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
)(withRouter(Bookmarks));
