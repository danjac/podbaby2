import React, { PropTypes, Component } from 'react';
import * as bs from 'react-bootstrap';
import { Field } from 'redux-form';

import FormControl from './FormControl';

class Login extends Component {

  render() {

    const { onSubmit, submitFailed, submitting } = this.props;

    return (
      <div>
        <bs.PageHeader>Login</bs.PageHeader>

        <form onSubmit={onSubmit}>

          {submitFailed && (
            <bs.Alert bsStyle="warning">
              Sorry, unable to log you in
            </bs.Alert>)}

          <Field name="username"
            component={FormControl}
            type="text"
            inputProps={{
              placeholder: 'Username',
            }} />

          <Field name="password"
            component={FormControl}
            type="password"
            inputProps={{
              placeholder: 'Password',
            }} />

          <bs.Button bsStyle="primary"
            disabled={submitting}
            className="form-control"
            type="submit">Login</bs.Button>

        </form>
      </div>
    );
  }
}

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default Login;
