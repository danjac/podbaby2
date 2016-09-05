import React from 'react';
import * as bs from 'react-bootstrap';

export const Pager = props => {
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
  next: React.PropTypes.string,
  previous: React.PropTypes.string,
  onSelect: React.PropTypes.func.isRequired,
};

export default Pager;
