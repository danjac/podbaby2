import React, { PropTypes, Component } from 'react';
import * as bs from 'react-bootstrap';
import { Link } from 'react-router';
import { Field } from 'redux-form';
import Icon from 'react-fa';

import FormControl from '..//FormControl';

class LoginForm extends Component {

  render() {

    const { onSubmit, submitFailed, submitting } = this.props;

    return (
      <div>
        <form onSubmit={onSubmit}>
          <bs.Well>Please enter your username and password to sign in.</bs.Well>

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
            type="submit">
            <Icon name="sign-in" /> Login</bs.Button>

          <div>
            <Link to="/recover-password/">Forgot your password?</Link>
          </div>

          <div>
            <Link to="/join/">Signup with new account</Link>
          </div>

        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default LoginForm;
