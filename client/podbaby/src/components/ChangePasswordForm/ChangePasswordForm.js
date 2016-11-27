import React, { PropTypes, Component } from 'react';
import * as bs from 'react-bootstrap';
import { Field } from 'redux-form';
import Icon from 'react-fa';

import FormControl from '..//FormControl';

class ChangePasswordForm extends Component {

  render() {

    const { onSubmit, submitting } = this.props;

    return (
      <div>
        <form onSubmit={onSubmit}>

          <Field
            name="password"
            component={FormControl}
            type="password"
            inputProps={{
              placeholder: 'Password',
            }}
          />

          <Field
            name="confirmPassword"
            component={FormControl}
            type="password"
            inputProps={{
              placeholder: 'Confirm password',
            }}
          />

          <bs.Button
            bsStyle="primary"
            disabled={submitting}
            className="form-control"
            type="submit">
            <Icon name="lock" /> Update
          </bs.Button>

        </form>
      </div>
    );
  }
}

ChangePasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default ChangePasswordForm;
