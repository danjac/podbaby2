import React, { PropTypes } from 'react';
import Icon from 'react-fa';
import * as bs from 'react-bootstrap';


export const Episode = props => {
  const {
    episode,
    episode: { channel },
    player,
    onStart,
    isLoggedIn,
    onStop } = props;
  const isPlaying = player.isPlaying && player.episode.id === episode.id;

  let playerBtn;

  if (isPlaying) {
    playerBtn = <bs.Button bsSize="small" onClick={onStop}><Icon name="stop" /></bs.Button>;
  } else {
    playerBtn = <bs.Button bsSize="small" onClick={onStart}><Icon name="play" /></bs.Button>;
  }

  let buttonGroup;

  if (isLoggedIn) {
    buttonGroup = (
      <bs.ButtonGroup>
          {playerBtn}
          <bs.Button bsSize="small"><Icon name="bookmark" /></bs.Button>
        </bs.ButtonGroup>
     );
  } else {
    buttonGroup = (
      <bs.ButtonGroup>
          {playerBtn}
        </bs.ButtonGroup>
     );
  }

  const styles = {
    border: "1pt solid #333",
    padding: 5,
  };

  return (
    <bs.Media style={styles}>
      <bs.Media.Left>
        {channel.thumbnail ? <img src={channel.thumbnail.url}
             width={channel.thumbnail.width}
             height={channel.thumbnail.height}
             alt={channel.name} /> : ''}
      </bs.Media.Left>
      <bs.Media.Body>
        <bs.Media.Heading>{channel.name}</bs.Media.Heading>
        <h5>{episode.title}</h5>
        <p>
          {channel.categories.map(cat => (
          <a href="#" key={cat.id}><bs.Label>{cat.name}</bs.Label>&nbsp;</a>
          ))}
          {episode.explicit ? <bs.Label bsStyle="danger"><Icon name="warning" /> Explicit</bs.Label> : ''}
        </p>
        {buttonGroup}
        <p>
          {episode.subtitle}
        </p>
      </bs.Media.Body>
    </bs.Media>
  );
};

Episode.propTypes = {
  episode: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  player: PropTypes.object.isRequired,
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
};


export default Episode;
