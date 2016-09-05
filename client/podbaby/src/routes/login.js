import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as bs from 'react-bootstrap';
import { login } from '../modules/auth';


class Login extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    // get values...
    const username = findDOMNode(this.username).value;
    const password = findDOMNode(this.password).value;
    // pass in router
    this.props.actions.login(username, password, this.props.router);
  }

  setUsername(ref) {
    this.username = ref;
    if (this.username !== null) {
      findDOMNode(this.username).focus();
    }
  }

  setPassword(ref) {
    this.password = ref;
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <bs.FormGroup>
          <bs.ControlLabel>Username</bs.ControlLabel>
          <bs.FormControl type="text" ref={this.setUsername} />
        </bs.FormGroup>
        <bs.FormGroup>
          <bs.ControlLabel>Password</bs.ControlLabel>
          <bs.FormControl type="password" ref={this.setPassword} />
        </bs.FormGroup>
        <bs.Button bsStyle="primary" className="form-control" type="submit">Login</bs.Button>
      </form>
    );
  }
}


const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      login: (username, password, router) => dispatch(login(username, password, router)),
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
