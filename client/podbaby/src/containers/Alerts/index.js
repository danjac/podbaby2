import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { dismissAlert } from '../../actions/alerts';

import AlertList from '../../components/AlertList';

export class Alerts extends Component {
  render() {
    return <AlertList {...this.props} />;
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
)(Alerts);
