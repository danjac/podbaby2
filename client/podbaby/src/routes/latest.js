import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as bs from 'react-bootstrap';

import { startPlayer, stopPlayer } from '../modules/player';
import { fetchEpisodes } from '../modules/episodes';
import EpisodeList from '../components/episode-list';
import { parsePageNumberFromUrl } from '../utils/pagination';
import { episodesSelector } from '../selectors';

class LatestEpisodes extends Component {

  constructor(props) {
    super(props);
    this.handleSelectPager = this.handleSelectPager.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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

  handleSearch(searchQuery) {
    this.props.router.replace({
      query: {
        page: 1,
        q: searchQuery,
      }
    });
  }

  handleSelectPager(url) {
    const page = parsePageNumberFromUrl(url);
    const query = {...this.props.location.query, page };
    this.props.router.replace({ query });
  }

  fetchEpisodes(page=1, searchQuery) {
    let url = '/api/episodes/?page=' + page;
    if (searchQuery) {
      url += '&q=' + searchQuery;
    }
    this.props.actions.fetchEpisodes(url);
  }

  render() {
    const { isLoggedIn, actions: { startPlayer, stopPlayer } } = this.props;

   const header = isLoggedIn && (
          <bs.Nav bsStyle="pills" justified activeKey={1} style={{ marginBottom: 20 }}>
            <bs.NavItem eventKey={1}>My feeds</bs.NavItem>
            <bs.NavItem eventKey={2}>All podcasts</bs.NavItem>
          </bs.Nav>
    );

    // activeKey=props.name
    return (
      <EpisodeList header={header}
                   onStartPlayer={startPlayer}
                   onStopPlayer={stopPlayer}
                   onSearch={this.handleSearch}
                   onSelectPager={this.handleSelectPager} {...this.props} />
    );
  }
}

LatestEpisodes.propTypes = {
  actions: PropTypes.object.isRequired,
  episodes: PropTypes.array.isRequired,
  next: PropTypes.string,
  previous: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
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
      startPlayer,
      stopPlayer,
      fetchEpisodes,
    }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps)(withRouter(LatestEpisodes));
