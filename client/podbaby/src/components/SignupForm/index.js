import React, { PropTypes, Component } from 'react';
import * as bs from 'react-bootstrap';
import { Field } from 'redux-form';
import Icon from 'react-fa';

import FormControl from '../FormControl';

class SignupForm extends Component {

  render() {

    const { onSubmit, submitFailed, submitting } = this.props;

    return (
      <div>
        <form onSubmit={onSubmit}>

          {submitFailed && (
            <bs.Alert bsStyle="warning">
              Sorry, unable to sign you up
            </bs.Alert>)}

          <Field name="username"
            component={FormControl}
            type="text"
            inputProps={{
              placeholder: 'Username',
            }} />

          <Field name="email"
            component={FormControl}
            type="email"
            inputProps={{
              placeholder: 'Email address',
            }} />

          <Field name="password"
            component={FormControl}
            type="password"
            inputProps={{
              placeholder: 'Password',
            }} />

          <Field name="confirmPassword"
            component={FormControl}
            type="password"
            inputProps={{
              placeholder: 'Confirm password',
            }} />

          <bs.Button bsStyle="primary"
            disabled={submitting}
            className="form-control"
            type="submit">
            <Icon name="user-plus" /> Signup</bs.Button>

        </form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default SignupForm;
