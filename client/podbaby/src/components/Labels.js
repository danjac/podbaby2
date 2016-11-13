import React, { PropTypes } from 'react';

import { categoryShape } from '../propTypes';

import { Link } from 'react-router';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';

import './Labels.css';

const Labels = ({ categories, explicit }) => {

  const labels = categories.map(category => (
    <bs.Label key={category.id} bsStyle="info">
      <Link to={`/feeds/browse/${category.id}/`}>{category.name}</Link>
    </bs.Label>
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
