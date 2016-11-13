import React, { PropTypes } from 'react';

import { categoryShape } from '../propTypes';

import * as bs from 'react-bootstrap';
import Icon from 'react-fa';

import './Labels.css';

const Labels = ({ categories, explicit }) => {

  const labels = categories.map(category => (
    <bs.Label key={category.id}>{category.name}</bs.Label>
  ));

  if (explicit) {
    labels.push(
      <bs.Label key="explicit" bsStyle="danger">
        <Icon name="warning" /> Explicit
      </bs.Label>
    );
  }

  return <div>{labels}</div>;

};

Labels.propTypes = {
  explicit: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(categoryShape).isRequired,
};

export default Labels;
