import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { partial, isEmpty } from 'lodash';
import * as bs from 'react-bootstrap';
import { login } from '../modules/auth';


class Login extends Component {

  constructor(props) {
    super(props);

    this.state = this.getInitState();

    this.handleSubmit = this.handleSubmit.bind(this);

    this.fields = ['username', 'password'];
    this.handlers = this.fields.reduce((handlers, field) => {
        handlers[field] = partial(this.handleChange, field).bind(this);
        return handlers;
    }, {});
  }

  getInitState() {
    return {
      values: {
        username: '',
        password: '',
      },
      touched: [],
      errors: {},
      formSubmitted: false,
    };
  }

  handleSubmit(event) {

    event.preventDefault();

    this.fields.forEach(field => {
      this.validate(field, this.state.values[field]);
    });

    this.setState({ formSubmitted: true });

    if (isEmpty(this.state.errors)) {
      const { username, password } = this.state.values;
      this.setState(this.getInitState())
      this.props.actions.login(username, password, this.props.router);
    }
  }

  handleChange(field, event) {
    if (!this.isTouched(field)) {
      const { touched } = this.state;
      touched.push(field);
      this.setState({ touched });
    }
    this.validate(field, event.target.value);
  }

  isTouched(field) {
    return this.state.touched.indexOf(field) > -1;
  }

  validate(field, value) {

    const { values, errors } = this.state;
    values[field] = value;

    const error = values[field] ? false : 'You must provide a value';

    if (error) {
      errors[field] = error;
    } else {
      delete errors[field];
    }
    this.setState({ values, errors });
  }

  getValidationState(field) {
    return this.state.errors[field] ? 'error': 'success';
  }

  render() {
    if (this.props.isLoggingIn) {
      return <h2>Logging you in..</h2>;
    }

    const { formSubmitted } = this.state;

    const validators = this.fields.reduce((validators, field) => {
        validators[field] = formSubmitted || this.isTouched(field) ? this.getValidationState(field) : null;
        return validators;
    }, {});

    return (
      <form onSubmit={this.handleSubmit}>
        <bs.FormGroup validationState={validators.username}>
          <bs.ControlLabel>Username</bs.ControlLabel>
          <bs.FormControl type="text"
                          value={this.state.username}
                          onBlur={this.handlers.username}
                          onChange={this.handlers.username} />
          <bs.FormControl.Feedback />
          {this.state.errors.username ? <bs.HelpBlock>{this.state.errors.username}</bs.HelpBlock> : ''}
        </bs.FormGroup>
        <bs.FormGroup validationState={validators.password}>
          <bs.ControlLabel>Password</bs.ControlLabel>
          <bs.FormControl type="password"
                          value={this.state.password}
                          onBlur={this.handlers.password}
                          onChange={this.handlers.password} />
          <bs.FormControl.Feedback />
          {this.state.errors.password ? <bs.HelpBlock>{this.state.errors.password}</bs.HelpBlock> : ''}
        </bs.FormGroup>
        <bs.Button bsStyle="primary" className="form-control" type="submit">Login</bs.Button>
      </form>
    );
  }
}


const mapStateToProps = state => {
  const { isLoggingIn } = state.auth;
  return { isLoggingIn };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      login: (username, password, router) => dispatch(login(username, password, router)),
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
