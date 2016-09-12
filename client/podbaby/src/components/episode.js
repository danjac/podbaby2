import React, { PropTypes } from 'react';
import Icon from 'react-fa';
import * as bs from 'react-bootstrap';


export const Episode = props => {
  const {
    episode,
    episode: { channel },
    player,
    onStart,
    onStop } = props;
  const isPlaying = player.isPlaying && player.episode.id === episode.id;

  let style = {};
  let button;

  if (isPlaying) {
    style.backgroundColor = '#eee';
    button = <bs.Button bsStyle="primary" onClick={onStop}><Icon name="stop" /></bs.Button>;
  } else {
    button = <bs.Button bsStyle="primary" onClick={onStart}><Icon name="play" /></bs.Button>;
  }

  return (
    <bs.Media style={style}>
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
          {episode.subtitle}
        </p>
        <p>
          {channel.categories.map(cat => (
          <a href="#" key={cat.id}><bs.Label>{cat.name}</bs.Label>&nbsp;</a>
          ))}
          {episode.explicit ? <bs.Label bsStyle="danger"><Icon name="warning" /> Explicit</bs.Label> : ''}
          {button}
        </p>
      </bs.Media.Body>
    </bs.Media>
  );
};

Episode.propTypes = {
  episode: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
};


export default Episode;
