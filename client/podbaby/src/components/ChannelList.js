import React, { PropTypes } from 'react';
import * as bs from 'react-bootstrap';

import { channelShape } from '../propTypes';

import Pager from './Pager';
import ChannelListItem from './ChannelListItem';

const ChannelList = props => {

  const {
    next,
    previous,
    channels,
    ifEmpty,
    onSelectPage,
  } = props;

  const style = {
    marginTop: 10,
  };

  if (!channels.length) {
    const msg = ifEmpty || 'No feeds found';
    return (
      <bs.Well style={style}>{msg}</bs.Well>
    );
  }

  const pager = (previous || next) ? (
    <Pager next={next}
           previous={previous}
           onSelect={onSelectPage} />) : '';

  return (
    <div style={style}>
      {pager}
      {channels.map(channel => (
        <ChannelListItem key={channel.id}
                         channel={channel}
                         {...props} />))}
      {pager}
    </div>
  );
};

ChannelList.propTypes = {
  channels: PropTypes.arrayOf(channelShape),
  next: PropTypes.number,
  previous: PropTypes.number,
  ifEmpty: PropTypes.string,
  onSelectPage: PropTypes.func.isRequired,
};

export default ChannelList;
