import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import NavContainer from './NavContainer';
import AlertsContainer from './AlertsContainer';
import PlayerContainer from './PlayerContainer';

import './AppContainer.css';

export class AppContainer extends Component {

  render() {

    return (
      <div className="container">
        <NavContainer />
        <AlertsContainer />
        {this.props.children}
        <PlayerContainer />
      </div>
    );
  }
}

AppContainer.propTypes = {
  children: PropTypes.node.isRequired,
};


export default connect()(withRouter(AppContainer));
