import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as bs from 'react-bootstrap';

import { fetchEpisodes } from '../modules/episodes';
import { episodesSelector } from '../selectors';

import EpisodeList from '../components/episode-list';

class LatestEpisodes extends Component {

  constructor(props) {
    super(props);
    this.fetchEpisodes = this.fetchEpisodes.bind(this);
  }

  fetchEpisodes(page=1, searchQuery) {
    let url = '/api/episodes/?page=' + page;
    if (searchQuery) {
      url += '&q=' + searchQuery;
    }
    this.props.dispatch(fetchEpisodes(url));
  }

  render() {
    const {
      isLoggedIn,
    } = this.props;

    const header = isLoggedIn && (
          <bs.Nav bsStyle="pills" justified activeKey={1} style={{ marginBottom: 20 }}>
            <bs.NavItem eventKey={1}>My feeds</bs.NavItem>
            <bs.NavItem eventKey={2}>All podcasts</bs.NavItem>
          </bs.Nav>
    );

    return (
      <EpisodeList header={header}
                   fetchEpisodes={this.fetchEpisodes}
                   {...this.props} />
    );
  }
}

LatestEpisodes.propTypes = {
  episodes: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
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

export default connect(mapStateToProps)(withRouter(LatestEpisodes));
