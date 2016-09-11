import React from 'react';
import Icon from 'react-fa';
import * as bs from 'react-bootstrap';


export const Episode = props => {
  const { episode, player, startPlayer, stopPlayer } = props;
  const { channel } = episode;
  const isPlaying = player.isPlaying && player.episode.id === episode.id;

  let style = {};
  let button;

  const onStart = event => {
    event.preventDefault();
    startPlayer(episode);
  };

  const onStop = event => {
    event.preventDefault();
    stopPlayer();
  };

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
        <h4>{episode.title}</h4>
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
  episode: React.PropTypes.object.isRequired,
  player: React.PropTypes.object.isRequired,
  startPlayer: React.PropTypes.func.isRequired,
  stopPlayer: React.PropTypes.func.isRequired,
};


export default Episode;
