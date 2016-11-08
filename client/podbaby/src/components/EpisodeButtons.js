import React, { PropTypes } from 'react';

import Icon from 'react-fa';
import * as bs from 'react-bootstrap';

import {
  episodePropTypes,
} from '../propTypes';

export const EpisodeButtons = ({
  episode,
  episode: { channel },
  authenticated,
  withChannel,
  onAddBookmark,
  onRemoveBookmark,
  onStartPlayer,
  onStopPlayer,
  onSubscribe,
  onUnsubscribe,
}) => {

  let buttons = [];
  let playerBtn;

  if (onStopPlayer && episode.playing) {
    playerBtn = (<bs.Button key="stopBtn"
                            title="Stop"
                            onClick={onStopPlayer}>
                            <Icon name="stop" /></bs.Button>);
  } else if (onStartPlayer) {
    playerBtn = (<bs.Button key="startBtn"
                            title="Play"
                            onClick={() => onStartPlayer(episode)}>
                            <Icon name="play" /></bs.Button>);
  }

  if (playerBtn) {
    buttons.push(playerBtn);
  }

  const downloadBtn = (
    <a key="downloadBtn"
       className="btn btn-default"
       title="Download this podcast"
       href={episode.enclosureUrl}>
      <Icon name="download" />
    </a>);

  buttons.push(downloadBtn);

  if (authenticated) {

    let bookmarkBtn;

    if (episode.bookmarked && onRemoveBookmark) {
      bookmarkBtn = (
        <bs.Button key="bookmarkBtn"
                   onClick={() => onRemoveBookmark(episode)}
                   title="Remove bookmark">
                   <Icon name="bookmark" /></bs.Button>);
    } else if (onAddBookmark) {
      bookmarkBtn = (
        <bs.Button key="bookmarkBtn"
                   onClick={() => onAddBookmark(episode)}
                   title="Bookmark this podcast">
                   <Icon name="bookmark-o" /></bs.Button>);
    }

    buttons.push(bookmarkBtn);

    if (withChannel) {
      let subscriptionBtn;
      if (onUnsubscribe && episode.subscribed) {
        subscriptionBtn = (
          <bs.Button key="subscribeBtn"
                       onClick={() => onUnsubscribe(episode.channel)}
                       title={`Unsubscribe from ${channel.name}`}>
                       <Icon name="minus-circle" /></bs.Button>);
      } else if (onSubscribe) {
        subscriptionBtn = (
          <bs.Button key="subscribeBtn"
                       onClick={() => onSubscribe(episode.channel)}
                       title={`Subscribe to ${channel.name}`}>
                       <Icon name="plus-circle" /></bs.Button>);

      }
      buttons.push(subscriptionBtn);
    }

  };

  buttons = buttons.map((btn, index) => (
    <bs.ButtonGroup key={index}>{btn}</bs.ButtonGroup>
  ));

  return (
    <bs.ButtonGroup justified>
      {buttons}
    </bs.ButtonGroup>);

};

EpisodeButtons.propTypes = {
  ...episodePropTypes,
  subscribed: PropTypes.bool,
};

EpisodeButtons.defaultProps = {
  withChannel: true,
};

export default EpisodeButtons;
