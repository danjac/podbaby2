import React, {
  PropTypes
} from 'react';

import * as bs from 'react-bootstrap';

const Alert = ({
  alert,
  onDismiss
}) => {
  return (
    <bs.Alert bsStyle={alert.level} onDismiss={() => onDismiss(alert.id)}>
      {alert.message}
    </bs.Alert>
  );

};

Alert.propTypes = {
  onDismiss: PropTypes.func.isRequired,
  alert: PropTypes.object.isRequired,
};

const AlertList = ({
  alerts,
  onDismiss
}) => {
  if (!alerts) {
    return <div />;
  }
  const style = {
    position: 'fixed',
    height: '50px',
    width: '99%',
    opacity: 0.9,
    textAlign: 'center',
    margin: '5% auto',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 200,

  };
  return (
    <div className="container"
         style={style}>
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
