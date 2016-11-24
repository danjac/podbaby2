import React, { PropTypes } from 'react';
import * as bs from 'react-bootstrap';

const Pager = ({ onSelect, next, previous }) => {

  return (
    <bs.Pager>
      <bs.Pager.Item previous onSelect={() => onSelect(previous)} disabled={!previous}>&larr; Previous</bs.Pager.Item>
      <bs.Pager.Item next onSelect={() => onSelect(next)} disabled={!next}>Next &rarr;</bs.Pager.Item>
    </bs.Pager>
  );
};

Pager.propTypes = {
  next: PropTypes.number,
  previous: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
};

export default Pager;
