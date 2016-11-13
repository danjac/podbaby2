import React from 'react';
import Icon from 'react-fa';

import './Loader.css';

const Loader = () => {

  return (
    <div className="loader">
      <h1>
        <Icon spin name="spinner" size="5x" />
      </h1>
    </div>
  );
};

export default Loader;
