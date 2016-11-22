import React, { PropTypes } from 'react';
import * as bs from 'react-bootstrap';

import { alertShape } from '../../propTypes';

import './index.css';

export const Alert = ({ alert, onDismiss }) => {
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

const AlertList = ({ alerts, onDismiss }) => {
  if (!alerts.length) {
    return <span></span>;
  }
  return (
    <div className="container alerts">
      {alerts.map(alert => (
        <Alert key={alert.id}
               alert={alert}
               onDismiss={onDismiss} />
      ))}
    </div>
  );
};

AlertList.propTypes = {
  onDismiss: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
};

export default AlertList;
