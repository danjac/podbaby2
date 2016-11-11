import React, { PropTypes } from 'react';

import Icon from 'react-fa';
import * as bs from 'react-bootstrap';

import { channelShape } from '../propTypes';

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
                       <Icon name="minus-circle" /></bs.Button>);
    } else {
      subscriptionBtn = (
        <bs.Button title='Subscribe to this feed'
                   onClick={() => onSubscribe(channel)}>
                       <Icon name="plus-circle" /></bs.Button>);
    }
    buttons.push(subscriptionBtn);
  }

  if (channel.link) {
    buttons.push(
      <a href={channel.link}
         title='Website'
         className="btn btn-default">
        <Icon name="globe" />
      </a>
    );
  }

  if (channel.rssFeed) {
    buttons.push(
      <a href={channel.rssFeed}
         title='RSS feed'
         className="btn btn-default">
        <Icon name="rss" />
      </a>
    );
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
