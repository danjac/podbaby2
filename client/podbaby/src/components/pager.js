import React, { PropTypes } from 'react';
import * as bs from 'react-bootstrap';

const Pager = props => {

  const { onSelect, next, previous } = props;

  const onSelectPrevious = () => onSelect(previous);
  const onSelectNext = () => onSelect(next);

  return (
    <bs.Pager>
      <bs.Pager.Item previous onSelect={onSelectPrevious} disabled={!previous}>&larr; Previous</bs.Pager.Item>
      <bs.Pager.Item next onSelect={onSelectNext} disabled={!next}>Next &rarr;</bs.Pager.Item>
    </bs.Pager>
  );
};

Pager.propTypes = {
  next: PropTypes.string,
  previous: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

export default Pager;
