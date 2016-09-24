import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';

import { startPlayer, stopPlayer } from '../modules/player';
import { fetchEpisodes } from '../modules/episodes';
import EpisodeList from '../components/episode-list';
import { parsePageNumberFromUrl } from '../utils/pagination';
import { episodesSelector } from '../selectors';

class LatestEpisodes extends Component {

  constructor(props) {
    super(props);
    this.handleSelectPager = this.handleSelectPager.bind(this);
  }

  componentDidMount() {
    this.fetchEpisodes(this.props.location.query.page || 1);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.query.page &&
      nextProps.location.query.page !== this.props.location.query.page) {
      this.fetchEpisodes(nextProps.location.query.page);
    }
  }

  handleSelectPager(url) {
    const page = parsePageNumberFromUrl(url);
    this.props.router.replace({ query: { page } });
  }

  fetchEpisodes(page=1) {
    this.props.actions.fetchEpisodes('/api/episodes/?page=' + page);
  }

  render() {
    const { isLoggedIn, actions: { startPlayer, stopPlayer } } = this.props;

    const tabContent = (
      <div style={{ paddingTop: 20 }}>
        <form>
          <bs.FormGroup>
            <bs.FormControl type="search" placeholder="Find a podcast..." />
          </bs.FormGroup>
          <bs.Button className="form-control" bsStyle="primary">
            <Icon name="search" />
          </bs.Button>
        </form>
      <EpisodeList onStartPlayer={startPlayer}
                   onStopPlayer={stopPlayer}
                   onSelectPager={this.handleSelectPager} {...this.props} />
      </div>
    );

    if (!isLoggedIn)  {
      return tabContent;
    }

    return (
      <bs.Tabs>
        <bs.Tab eventKey={1} title="My feeds">{tabContent}</bs.Tab>
        <bs.Tab eventKey={2} title="My bookmarks">{tabContent}</bs.Tab>
        <bs.Tab eventKey={3} title="My history">{tabContent}</bs.Tab>
        <bs.Tab eventKey={4} title="All episodes">{tabContent}</bs.Tab>
      </bs.Tabs>);
  }
}

LatestEpisodes.propTypes = {
  actions: PropTypes.object.isRequired,
  episodes: PropTypes.array.isRequired,
  next: PropTypes.string,
  previous: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  player: PropTypes.object.isRequired,
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
    player,
  } = state;

  const episodes = episodesSelector(state);

  return {
    episodes,
    next,
    previous,
    isLoading,
    isLoggedIn,
    player,
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
