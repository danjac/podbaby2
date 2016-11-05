import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import NavContainer from './NavContainer';
import AlertsContainer from './AlertsContainer';

import './AppContainer.css';

export class AppContainer extends Component {

  render() {

    return (
      <div>
        <NavContainer />
        <AlertsContainer />
        {this.props.children}
      </div>
    );
  }
}

AppContainer.propTypes = {
  children: PropTypes.node.isRequired,
};


export default connect()(withRouter(AppContainer));
