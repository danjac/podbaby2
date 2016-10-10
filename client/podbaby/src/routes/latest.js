import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import * as bs from 'react-bootstrap';

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

export class LatestEpisodes extends Component {

  constructor(props) {
    super(props);

    this.handleShowAll = this.handleShowAll.bind(this);
    this.handleShowSubscriptions = this.handleShowSubscriptions.bind(this);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleClearSearch = this.handleClearSearch.bind(this);
    this.handleSelectPage = this.handleSelectPage.bind(this);

  }

  componentDidMount() {
    const { page, q, show } = this.props.location.query;
    this.fetchEpisodes(page || 1, q, show);
  }

  componentWillReceiveProps(nextProps) {

    const thisQuery = this.props.location.query;
    const nextQuery = nextProps.location.query;

    if (thisQuery !== nextQuery) {
      const { page, q, show } = nextQuery;
      this.fetchEpisodes(page, q, show);
    }
  }

  fetchEpisodes(page=1, searchQuery, show) {
    const { isLoggedIn, actions: { onFetchEpisodes } } = this.props;
    let url = (show === 'all' || !isLoggedIn) ? '/api/episodes/' : '/api/episodes/subscribed/';
    const params = {};
    if (page) {
      params.page = page;
    }
    if (searchQuery) {
      params.q = searchQuery;
    }
    onFetchEpisodes(url, params);
  }

  changeLocation(nextQuery) {
    const query = {...this.props.location.query, ...nextQuery};
    this.props.router.replace({ query });
  }

  handleShowAll() {
    this.changeLocation({ page: 1, show: 'all' });
  }

  handleShowSubscriptions() {
    this.changeLocation({ page: 1, show: 'feeds' });
  }

  handleSearch(searchQuery) {
    this.changeLocation({ page: 1, q: searchQuery });
  }

  handleClearSearch() {
    this.changeLocation({ page: 1, q: '' });
  }

  handleSelectPage(url) {
    const page = pageNumberFromUrl(url);
    this.changeLocation({ page });
  }

  render() {

    const {
      episodes,
      next,
      previous,
      isLoggedIn,
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
    const showAll = query.show === 'all';

    const ifEmpty = searchQuery && 'No results found for your search.';

    return (
      <div>
        {isLoggedIn && (
        <bs.Nav justified bsStyle="pills" style={{ marginBottom: 20 }}>
          <bs.NavItem active={!showAll} onClick={this.handleShowSubscriptions}>My feeds</bs.NavItem>
          <bs.NavItem active={showAll} onClick={this.handleShowAll}>All podcasts</bs.NavItem>
        </bs.Nav>)}

        <Search placeholder="Search for episodes"
                searchQuery={searchQuery}
                onClear={this.handleClearSearch}
                onSearch={this.handleSearch} />

        <EpisodeList episodes={episodes}
                     next={next}
                     previous={previous}
                     ifEmpty={ifEmpty}
                     isLoggedIn={isLoggedIn}
                     onSelectPage={this.handleSelectPage}
                     {...actions} />
      </div>
    );
  }
}

LatestEpisodes.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  episodes: PropTypes.array.isRequired,
  next: PropTypes.string,
  previous: PropTypes.string,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  const {
    episodes: {
      next,
      previous,
      isLoading
    },
    auth: {
      isLoggedIn,
    },
  } = state;

  const episodes = episodesSelector(state);

  return {
    episodes,
    next,
    previous,
    isLoading,
    isLoggedIn,
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
)(withRouter(LatestEpisodes));
