import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

export class Categories extends Component {

  render() {
    return (
      <div>Categories go here</div>
    );
  }

}

export default connect(
  //mapStateToProps,
  //mapDispatchToProps,
)(withRouter(Categories));
