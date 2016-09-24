import React, { PropTypes } from 'react';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';

const Player = props => {
  const { isPlaying, episode, onStop, isLoggedIn } = props;

  if (!isPlaying || !episode) {
    return <div></div>;
  }

  const { channel } = episode;

  const onPlay = ({ currentTarget }) => {
    currentTarget.currentTime = 0;
  };

  let title = episode.title;
  if (title) {
    title += ' ' + channel.name;
  } else {
    title = channel.name;
  }
  if (episode.duration) {
    title += ' : ' + episode.duration;
  }
  const stopBtn = (
    <bs.Button key="stopBtn"
               bsSize="small"
               onClick={onStop}
               title="Stop">
    <Icon name="stop" /></bs.Button>);

  const downloadBtn = (
    <a key="downloadBtn"
       className="btn btn-sm btn-default"
       title="Download this podcast"
       href={episode.enclosureUrl}>
      <Icon name="download" />
    </a>);


  let buttons = [
    stopBtn,
    downloadBtn,
  ];

  if (isLoggedIn) {
    buttons = [...buttons, ...[

      (<bs.Button key="bookmarkBtn"
                  bsSize="small"
                  title="Bookmark this episode">
                  <Icon name="bookmark" /></bs.Button>),

      (<bs.Button key="subscribeBtn"
                  bsSize="small"
                  title={`Subscribe to ${channel.name}`}>
                  <Icon name="pencil" /></bs.Button>),

    ]];
  };

  const buttonGroup = (
    <bs.ButtonGroup className="pull-right">
      {buttons}
    </bs.ButtonGroup>);

  return (
    <div className="audio-player">
      <bs.Media>
        <bs.Media.Body>
          <bs.Media.Heading>
            <a href="#" style={{ color: '#fff' }}>{title}</a>
            {buttonGroup}
          </bs.Media.Heading>
          <p style={{ paddingTop: 10 }}>
            <audio controls autoPlay onPlay={onPlay} src={episode.streamUrl}>
              <source src={episode.streamUrl} type={episode.enclosureType} />
            </audio>
          </p>
        </bs.Media.Body>
      </bs.Media>
    </div>
  );
};

Player.propTypes = {
  onStop: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  episode: PropTypes.any,
};

export default Player;
