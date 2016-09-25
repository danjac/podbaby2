import React, { PropTypes } from 'react';
import * as bs from 'react-bootstrap';

const Alert = props => {
  const { alert, onDismiss } = props;
  const handleDismiss = () => onDismiss(alert.id);
  return (
    <bs.Alert bsStyle={alert.level} onDismiss={handleDismiss}>
      {alert.message}
    </bs.Alert>
  );

};

Alert.propTypes = {
  onDismiss: PropTypes.func.isRequired,
  alert: PropTypes.object.isRequired,
};

const AlertList = props => {
  const { alerts, onDismiss } = props;
  if (!alerts) {
    return <div />;
  }
  return (
    <div className="container"
         style={{
           position: 'fixed',
           height: '50px',
           width: 300,
           opacity: 0.9,
           textAlign: 'center',
           margin: '5% auto',
           left: 0,
           right: 0,
           zIndex: 200,
           }}>
      {alerts.map(alert => (
        <Alert key={alert.id} alert={alert} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

AlertList.propTypes = {
  onDismiss: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
};

export default AlertList;


