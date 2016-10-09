import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import {
  logout,
  addBookmark,
  removeBookmark,
  subscribe,
  unsubscribe,
} from './modules/auth';

import { dismissAlert } from './modules/alerts';
import { stopPlayer } from './modules/player';

import { playingEpisodeSelector } from './selectors';

import AlertList from './components/alerts';
import Navbar from './components/navbar';
import Player from './components/player';

import './App.css';

export class App extends Component {


  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    const { router, actions } = this.props;
    actions.logout();
    router.push("/");
  }

  render() {

    const {
      playingEpisode,
      alerts,
      auth,
      auth: {
        isLoggedIn,
      }, actions } = this.props;

    return (
      <div>
        <Navbar onLogout={this.handleLogout} auth={auth} />
        <div className="container" style={{ marginTop: 80 }}>
          <AlertList onDismiss={actions.onDismissAlert} alerts={alerts} />
          {this.props.children}
        </div>
        <Player isLoggedIn={isLoggedIn}
                episode={playingEpisode} {...actions} />
      </div>
    );
  }
}

App.propTypes =  {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  children: PropTypes.node.isRequired,
  router: PropTypes.object.isRequired,
  playingEpisode: PropTypes.any,
  auth: PropTypes.object.isRequired,
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  return {
    playingEpisode: playingEpisodeSelector(state),
    auth: state.auth,
    alerts: state.alerts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({
      onLogout: logout,
      onDismissAlert: dismissAlert,
      onStopPlayer: stopPlayer,
      onAddBookmark: addBookmark,
      onRemoveBookmark: removeBookmark,
      onSubscribe: subscribe,
      onUnsubscribe: unsubscribe,
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
