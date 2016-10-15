import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

export class Channels extends Component {

  render() {
    return (
      <div>Channels go here</div>
    );
  }

}

export default connect(
  //mapStateToProps,
  //mapDispatchToProps,
)(withRouter(Channels));
