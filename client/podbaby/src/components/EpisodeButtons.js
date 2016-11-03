import React, { PropTypes } from 'react';

import Icon from 'react-fa';
import * as bs from 'react-bootstrap';

export const EpisodeButtons = ({
  episode,
  episode: { channel },
  authenticated,
  onAddBookmark,
  onRemoveBookmark,
  onStartPlayer,
  onStopPlayer,
  onSubscribe,
  onUnsubscribe,
}) => {

  let buttons = [];
  let playerBtn;

  if (episode.isPlaying) {
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

    if (episode.isBookmarked) {
      bookmarkBtn = (
        <bs.Button key="bookmarkBtn"
                   onClick={() => onRemoveBookmark(episode)}
                   title="Remove bookmark">
                   <Icon name="star" /></bs.Button>);
    } else {
      bookmarkBtn = (
        <bs.Button key="bookmarkBtn"
                   onClick={() => onAddBookmark(episode)}
                   title="Bookmark this podcast">
                   <Icon name="star-o" /></bs.Button>);
    }

    buttons.push(bookmarkBtn);

    if (onSubscribe && onUnsubscribe) {
      let subscriptionBtn;
      if (episode.isSubscribed) {
        subscriptionBtn = (
          <bs.Button key="subscribeBtn"
                     onClick={() => onUnsubscribe(episode.channel)}
                     title={`Unsubscribe from ${channel.name}`}>
                     <Icon name="remove" /></bs.Button>);
      } else {
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
  episode: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  onAddBookmark: PropTypes.func.isRequired,
  onRemoveBookmark: PropTypes.func.isRequired,
  onStopPlayer: PropTypes.func.isRequired,
  onStartPlayer: PropTypes.func,
  onSubscribe: PropTypes.func,
  onUnsubscribe: PropTypes.func,
};


export default EpisodeButtons;
