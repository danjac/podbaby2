import React, { PropTypes } from 'react';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';

const Categories = ({ categories, explicit }) => {

  const style={
    display: 'inline-block',
    marginRight: 10,
    marginBottom: 5,
    padding: 5,
  };

  const items = categories.map(cat => (
    <bs.Label key={cat.id} style={style}>{cat.name}</bs.Label>
  ));

  if (explicit) {
    items.push(
      <bs.Label key="explicit"
                bsStyle="danger"
                style={style}>
        <Icon name="warning" /> Explicit
      </bs.Label>
    );
  }

  return <div>{items}</div>;

};

Categories.propTypes = {
  explicit: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Categories;
