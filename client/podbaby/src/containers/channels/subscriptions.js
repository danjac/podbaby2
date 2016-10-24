import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

export class Subscriptions extends Component {

  render() {
    return (
      <div>Subscriptions go here</div>
    );
  }

}

export default connect(
  //mapStateToProps,
  //mapDispatchToProps,
)(withRouter(Subscriptions));
