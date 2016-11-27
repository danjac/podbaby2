import React, { PropTypes, Component } from 'react';
import * as bs from 'react-bootstrap';
import { Field } from 'redux-form';
import Icon from 'react-fa';

import FormControl from '..//FormControl';

class ChangeEmailForm extends Component {

  render() {

    const { onSubmit, submitting } = this.props;

    return (
      <div>
        <form onSubmit={onSubmit}>

          <Field
            name="email"
            component={FormControl}
            type="text"
            inputProps={{
              placeholder: 'Email address',
            }}
          />

          <bs.Button
            bsStyle="primary"
            disabled={submitting}
            className="form-control"
            type="submit">
            <Icon name="envelope" /> Update
          </bs.Button>

        </form>
      </div>
    );
  }
}

ChangeEmailForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default ChangeEmailForm;
