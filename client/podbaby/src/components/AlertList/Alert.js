import React, { PropTypes } from 'react';
import * as bs from 'react-bootstrap';

import { alertShape } from '../../propTypes';

const Alert = ({ alert, onDismiss }) => {
  return (
    <bs.Alert bsStyle={alert.style}
              onDismiss={() => onDismiss(alert.id)}>
      {alert.message}
    </bs.Alert>
  );

};

Alert.propTypes = {
  alert: alertShape.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default Alert;
