import React, { PropTypes } from 'react';

import * as bs from 'react-bootstrap';
import Icon from 'react-fa';

const Labels = ({ categories, explicit }) => {

  const style = {
    display: 'inline-block',
    marginRight: 10,
    marginBottom: 5,
    padding: 5,
  };

  const labels = categories.map(cat => (
    <bs.Label key={cat.id} style={style}>{cat.name}</bs.Label>
  ));

  if (explicit) {
    labels.push(
      <bs.Label key="explicit"
                bsStyle="danger"
                style={style}>
        <Icon name="warning" /> Explicit
      </bs.Label>
    );
  }

  return <div>{labels}</div>;

};

Labels.propTypes = {
  explicit: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Labels;
