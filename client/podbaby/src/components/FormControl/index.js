import React, { PropTypes } from 'react';
import * as bs from 'react-bootstrap';

const FormControl = ({

  input,
  type,
  label,
  inputProps,

  meta: {
    touched,
    error,
  },

}) => {

  let validationState;

  if (touched) {
    validationState = error ? 'error' : 'success';
  }

  return (
    <bs.FormGroup validationState={validationState}>
      {label && <bs.ControlLabel>{label}</bs.ControlLabel>}
      <bs.FormControl type={type} {...input} {...inputProps} />
      <bs.FormControl.Feedback />
      {touched && error && <bs.HelpBlock>{error}</bs.HelpBlock>}
    </bs.FormGroup>
  );

};

FormControl.propTypes = {
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  inputProps: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
};

export default FormControl;
