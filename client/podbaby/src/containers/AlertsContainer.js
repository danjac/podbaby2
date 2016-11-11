import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { dismissAlert } from '../actions/alerts';

import Alerts from '../components/Alerts';

export class AlertsContainer extends Component {
  render() {
    return <Alerts {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    alerts: state.alerts,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    onDismiss: dismissAlert,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlertsContainer);
