import React, { PropTypes } from 'react';
import * as bs from 'react-bootstrap';
import { omit } from 'lodash';

const FormControl = ({ field }) => {

  let validationState;

  if (field.meta.touched) {
    validationState = field.meta.error ? 'error' : 'success';
  }

  const props = omit(field, ['input', 'meta', 'label']);

  return (
      <bs.FormGroup validationState={validationState}>
        {field.label && <bs.ControlLabel>{field.label}</bs.ControlLabel>}
        <bs.FormControl type={field.type} {...field.input} {...props} />
        <bs.FormControl.Feedback />
        {field.meta.touched && field.meta.error && <bs.HelpBlock>{field.meta.error}</bs.HelpBlock>}
      </bs.FormGroup>
  );

};

FormControl.propTypes = {
  field: PropTypes.object.isRequired,
};

export default FormControl;
