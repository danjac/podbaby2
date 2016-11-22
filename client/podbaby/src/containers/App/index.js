import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Navigation from '../Navigation';
import Alerts from '../Alerts';
import Player from '../Player';

export class App extends Component {

  render() {

    return (
      <div className="container">
        <Navigation />
        <Alerts />
        {this.props.children}
        <Player />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};


export default connect()(withRouter(App));
