import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';
import {
  withRouter
} from 'react-router';
import * as bs from 'react-bootstrap';

import formHandler from '../components/form';

import {
  login
} from '../modules/login';


class Login extends Component {

  render() {
    const {
      values,
      errors,
      handlers,
      validators,
      onSubmit,
      isLoggingIn
    } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <bs.FormGroup validationState={validators.username}>
          <bs.ControlLabel>Username</bs.ControlLabel>
          <bs.FormControl type="text"
                          value={values.username}
                          onBlur={handlers.username}
                          onChange={handlers.username} />
          <bs.FormControl.Feedback />
          {errors.username ? <bs.HelpBlock>{errors.username.join(", ")}</bs.HelpBlock> : ''}
        </bs.FormGroup>
        <bs.FormGroup validationState={validators.password}>
          <bs.ControlLabel>Password</bs.ControlLabel>
          <bs.FormControl type="password"
                          value={values.password}
                          onBlur={handlers.password}
                          onChange={handlers.password} />
          <bs.FormControl.Feedback />
          {errors.password ? <bs.HelpBlock>{errors.password.join(", ")}</bs.HelpBlock> : ''}
        </bs.FormGroup>
        <bs.Button disabled={isLoggingIn} bsStyle="primary" className="form-control" type="submit">Login</bs.Button>
      </form>
    );
  }
}

const defaults = {
  username: '',
  password: '',
};

const constraints = {
  username: {
    presence: true,
    length: {
      minimum: 5,
    }
  },
  password: {
    presence: true,
  },
};

const onSubmit = (props, values, resetForm) => {
  const {
    username,
    password
  } = values;
  props.actions.login(username, password, props.router);
  resetForm();
};


const mapStateToProps = state => {
  const {
    isLoggingIn
  } = state.login;
  return {
    isLoggingIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      login: (username, password, router) => dispatch(login(username, password, router)),
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(formHandler(Login, defaults, constraints, onSubmit)));
