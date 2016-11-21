import React, { PropTypes } from 'react';

import Icon from 'react-fa';
import * as bs from 'react-bootstrap';

import { channelShape } from '../../propTypes';

const ChannelButtons = ({
  channel,
  authenticated,
  onSubscribe,
  onUnsubscribe,
}) => {

  let buttons = [];
  let subscriptionBtn;

  if (authenticated) {
    if (channel.subscribed) {
      subscriptionBtn = (
        <bs.Button title='Unsubscribe from this feed'
                   onClick={() => onUnsubscribe(channel)}>
                       <Icon name="trash" /> Unsubscribe</bs.Button>);
    } else {
      subscriptionBtn = (
        <bs.Button title='Subscribe to this feed'
                   onClick={() => onSubscribe(channel)}>
                       <Icon name="rss" /> Subscribe</bs.Button>);
    }
    buttons.push(subscriptionBtn);
  }

  buttons = buttons.map((btn, index) => (
    <bs.ButtonGroup key={index}>{btn}</bs.ButtonGroup>
  ));

  return (
    <bs.ButtonGroup justified>
      {buttons}
    </bs.ButtonGroup>);

};

ChannelButtons.propTypes = {
  channel: channelShape,
  authenticated: PropTypes.bool.isRequired,
  onSubscribe: PropTypes.func.isRequired,
  onUnsubscribe: PropTypes.func.isRequired,
};

export default ChannelButtons;
