import React, { Component } from 'react';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'
import { withRouter, Link } from 'react-router';
import { connect } from 'react-redux';
import * as bs from 'react-bootstrap';

import { startPlayer, stopPlayer } from './modules/player';

import './App.css';

const Player = props => {
  const { isPlaying, episode } = props;

  if (!isPlaying) {
    return <div></div>;
  }

  return (
    <div className="container audio-player">
      <h4>{episode.title}</h4>
      <audio controls autoPlay>
        <source src={episode.enclosureUrl} type={episode.enclosureType} />
      </audio>
    </div>
  );
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { player: null };

    this.onStartPlayer = this.onStartPlayer.bind(this);
    this.onStopPlayer = this.onStopPlayer.bind(this);

  }

  onStartPlayer(episode) {
    this.setState({ player: { episode }});
  }

  onStopPlayer() {
    this.setState({ player: null });
  }

  render() {

    return (
      <div>
        <bs.Navbar>
          <bs.Navbar.Header>
            <bs.Navbar.Brand>
              <Link to={{ pathname: '/', query: { page: 1 }}}>Podbaby</Link>
            </bs.Navbar.Brand>
          </bs.Navbar.Header>
          <bs.Nav>
            <IndexLinkContainer to="/">
              <bs.NavItem>Latest episodes</bs.NavItem>
            </IndexLinkContainer>
          </bs.Nav>
          <bs.Nav pullRight>
            <LinkContainer to="/login/">
              <bs.NavItem>Login</bs.NavItem>
            </LinkContainer>
          </bs.Nav>
        </bs.Navbar>
        <div className="container">
          {this.props.children}
        </div>
        <Player {...this.props.player} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
