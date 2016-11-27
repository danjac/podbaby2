import React, { PropTypes, Component } from 'react';
import * as bs from 'react-bootstrap';
import { Field } from 'redux-form';
import Icon from 'react-fa';

import FormControl from '..//FormControl';

class RecoverPasswordForm extends Component {

  render() {

    const { onSubmit, submitFailed, submitting } = this.props;

    return (
      <div>
        <form onSubmit={onSubmit}>
          <bs.Well>Enter your username and we'll email you a new password.</bs.Well>

          {submitFailed && (
            <bs.Alert bsStyle="warning">
              Sorry, unable to find your details.
            </bs.Alert>)}

          <Field name="username"
            component={FormControl}
            type="text"
            inputProps={{
              placeholder: 'Your username',
            }} />

          <bs.Button bsStyle="primary"
            disabled={submitting}
            className="form-control"
            type="submit">
            <Icon name="unlock" /> Recover password</bs.Button>

        </form>
      </div>
    );
  }
}

RecoverPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default RecoverPasswordForm;
