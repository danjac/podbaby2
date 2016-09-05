import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as api from '../api';
import { startPlayer, stopPlayer } from '../modules/player';
import Pager from '../components/pager';
import Episode from '../components/episode';


const extractPageNumberFromUrl = url => {
  const match = /.*?[\?&]page=(\d+).*?/.exec(url);
  if (match) {
    return Number(match[1]).valueOf();
  }
  return null;
};

class LatestEpisodes extends Component {

  constructor(props) {
    super(props);
    this.state = { results: [], isWaiting: true };
    this.onSelectPager = this.onSelectPager.bind(this);

  }

  componentDidMount() {
    this.getStateFromStore(null);
  }

  onSelectPager(url) {
    this.getStateFromStore(url);
  }

  getStateFromStore(url, props) {

    props = props || this.props;

    if (url) {
      const pageNumber = extractPageNumberFromUrl(url);
      if (pageNumber) {
        props.router.replace({ query: { page: pageNumber }})
      }
    } else {
      const page = props.location.query.page || 1;
      url = '/api/episodes/?page=' + page;
    }

    this.setState({ isWaiting: true });

    api.get(url)
    .then(response => this.setState({isWaiting: false, ...response}));
  }

  render() {

    if (this.state.isWaiting) {
        return <h1>Waiting...</h1>;
    }

    const pager = this.state.previous || this.state.next ?
      <Pager {...this.state} onSelect={this.onSelectPager} /> : '';

    return (
      <div>
          {pager}
          {this.state.results.map(episode => (
          <Episode key={episode.id}
                   episode={episode}
                   startPlayer={this.props.actions.startPlayer}
                   stopPlayer={this.props.actions.stopPlayer}
                   player={this.props.player} />
          ))}
          {pager}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    player: state.player,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      startPlayer: (episode) => {
        dispatch(startPlayer(episode));
      },
      stopPlayer: () => {
        dispatch(stopPlayer());
      },
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LatestEpisodes));
