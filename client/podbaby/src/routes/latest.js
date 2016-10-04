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

  constructor(props) {
    super(props);
    this.handleSelectPager = this.handleSelectPager.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    const { page, q } = this.props.location.query;
    this.props.fetchEpisodes(page || 1, q);
  }

  componentWillReceiveProps(nextProps) {

    const thisQuery = this.props.location.query;
    const nextQuery = nextProps.location.query;

    if (thisQuery !== nextQuery) {
      const { page, q } = nextQuery;
      this.props.fetchEpisodes(page, q);
    }

  }

  handleSearch(event) {
    event.preventDefault();
    const query = ReactDOM.findDOMNode(this.refs.search).value.trim();
    this.props.router.replace({
      query: {
        page: 1,
        q: query,
      },
      pathname: this.props.location.pathname,
    });
  }

  handleSelectPager(url) {
    const page = parsePageNumberFromUrl(url);
    const query = {...this.props.location.query, page };
    this.props.router.replace({ query });
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

    return (
      <div>
      <EpisodeList header={header}
                   fetchEpisodes={fetch}
                   {...this.props} />
      </div>
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
