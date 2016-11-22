import React, { PropTypes } from 'react';

import Alert from './Alert';
import './AlertList.css';

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
