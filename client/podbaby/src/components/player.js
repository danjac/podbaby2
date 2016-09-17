import React from 'react';
import * as bs from 'react-bootstrap';

const Player = props => {
  const { isPlaying, episode } = props;

  if (!isPlaying || !episode) {
    return <div></div>;
  }

  const onPlay = ({ currentTarget }) => {
    currentTarget.currentTime = 0;
  };

  let title = episode.title;
  if (episode.duration) {
    title += ' : ' + episode.duration;
  }

  return (
    <bs.Media className="audio-player">
      <bs.Media.Body>
        <bs.Media.Heading>{title}</bs.Media.Heading>
        <p>
          <audio controls autoPlay onPlay={onPlay} src={episode.streamUrl}>
            <source src={episode.streamUrl} type={episode.enclosureType} />
          </audio>
        </p>
      </bs.Media.Body>
    </bs.Media>
  );
};

export default Player;
