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
    this.state = {
      mode: 'all',
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(key) {
    this.setState({ mode: key });
  }

  render() {
    const { isLoggedIn, dispatch } = this.props;
    const { mode } = this.state;

    const header = isLoggedIn && (
      <bs.Nav bsStyle="pills"
              justified
              activeKey={mode}
              onSelect={this.handleSelect}
              style={{ marginBottom: 20 }}>
        <bs.NavItem eventKey={'all'}>All podcasts</bs.NavItem>
        <bs.NavItem eventKey={'subs'}>My feeds</bs.NavItem>
      </bs.Nav>
    );

    // problem: this will be called once, before user is logged in
    // we therefore need to trigger again, when user is authenticated
// alternative solution - use different routes for /subscribed and /all
//
    const fetch = (page, searchQuery) => {
      let url = '/api/episodes/';
      if (mode === 'subs') {
        url += 'subscribed/';
      }
      url += '?page=' + page;
      if (searchQuery) {
        url += '&q=' + searchQuery;
      }
      dispatch(fetchEpisodes(url));
    }

    return (
      <EpisodeList header={header}
                   fetchEpisodes={fetch}
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
