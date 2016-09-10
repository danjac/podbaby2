import React, { Component } from 'react';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'
import { withRouter, Link } from 'react-router';
import { connect } from 'react-redux';
import * as bs from 'react-bootstrap';

import { logout } from './modules/auth';
import { dismissAlert } from './modules/alerts';
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

const Alert = props => {
  const { alert, onDismiss } = props;
  const handleDismiss = () => onDismiss(alert.id);
  return (
    <bs.Alert bsStyle={alert.level} onDismiss={handleDismiss}>
      {alert.message}
    </bs.Alert>
  );

};

export class App extends Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleDismissAlert = this.handleDismissAlert.bind(this);
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.actions.logout();
  }

  handleDismissAlert(id) {
    this.props.actions.dismissAlert(id);
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
          {this.props.auth.isLoggedIn ? (
            <bs.Nav pullRight>
              <bs.NavItem href="#">{this.props.auth.currentUser.username}</bs.NavItem>
              <bs.NavItem href="#" onClick={this.handleLogout}>Logout</bs.NavItem>
            </bs.Nav>
          ) : (
          <bs.Nav pullRight>
            <LinkContainer to="/login/">
              <bs.NavItem>Login</bs.NavItem>
            </LinkContainer>
          </bs.Nav>
          )}
        </bs.Navbar>
        <div className="container">
          {this.props.alerts.map(alert => (
            <Alert key={alert.id} alert={alert} onDismiss={this.handleDismissAlert} />
          ))}
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
    auth: state.auth,
    alerts: state.alerts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      logout: () => {
        dispatch(logout());
      },
      dismissAlert: (id) => {
        dispatch(dismissAlert(id));
      },
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
