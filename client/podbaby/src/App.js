import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { logout } from './modules/auth';
import { dismissAlert } from './modules/alerts';
import { stopPlayer } from './modules/player';

import AlertList from './components/alerts';
import Navbar from './components/navbar';
import Player from './components/player';

import './App.css';

export class App extends Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleDismissAlert = this.handleDismissAlert.bind(this);
    this.handleStopPlayer = this.handleStopPlayer.bind(this);
  }

  handleLogout() {
    this.props.actions.logout();
  }

  handleDismissAlert(id) {
    this.props.actions.dismissAlert(id);
  }

  handleStopPlayer() {
    this.props.actions.stopPlayer();
  }

  render() {
    return (
      <div>
        <Navbar onLogout={this.handleLogout} {...this.props} />
        <div className="container" style={{ marginTop: 80 }}>
          <AlertList onDismiss={this.handleDismissAlert} {...this.props} />
          {this.props.children}
        </div>
        <Player onStop={this.handleStopPlayer}
                isLoggedIn={this.props.auth.isLoggedIn}
                {...this.props.player} />
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
    actions: bindActionCreators({
      logout,
      dismissAlert,
      stopPlayer,
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
