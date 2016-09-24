import React from 'react';
import Icon from 'react-fa';

const Loader = () => {

  const styles = {
    textAlign: 'center',
    marginTop: 50,
  };
  return (
    <div style={styles}>
      <h1>
        <Icon spin name="spinner" size="5x" />
      </h1>
    </div>
  );
};

export default Loader;
