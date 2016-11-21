import React, { PropTypes } from 'react';

import { sanitize } from '../utils';

import './index.css';

const Description = ({ content }) => {
  if (!content) {
    return <p></p>;
  }
  return <p className="description" dangerouslySetInnerHTML={sanitize(content)}></p>;
};

Description.propTypes = {
  content: PropTypes.string,
};

export default Description;
