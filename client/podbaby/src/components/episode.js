import React, { PropTypes } from 'react';
import Icon from 'react-fa';
import * as bs from 'react-bootstrap';


export const Episode = props => {
  const {
    episode,
    episode: { channel },
    isLoggedIn,
    onStartPlayer,
    onStopPlayer } = props;

  let playerBtn;

  if (episode.isPlaying) {
    playerBtn = <bs.Button bsSize="small" title="Stop" onClick={onStopPlayer}><Icon name="stop" /></bs.Button>;
  } else {
    playerBtn = <bs.Button bsSize="small" title="Play" onClick={() => onStartPlayer(episode)}><Icon name="play" /></bs.Button>;
  }

  const downloadBtn = (
    <a className="btn btn-sm btn-default"
       title="Download this podcast"
       href={episode.enclosureUrl}>
      <Icon name="download" />
    </a>);

  let buttonGroup;

  if (isLoggedIn) {
    buttonGroup = (
      <bs.ButtonGroup>
          {playerBtn}
          {downloadBtn}
          <bs.Button bsSize="small" title="Bookmark this episode"><Icon name="bookmark" /></bs.Button>
          <bs.Button bsSize="small" title={`Subscribe to ${channel.name}`}><Icon name="pencil" /></bs.Button>
        </bs.ButtonGroup>
     );
  } else {
    buttonGroup = (
      <bs.ButtonGroup>
          {playerBtn}
          {downloadBtn}
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
  onStartPlayer: PropTypes.func.isRequired,
  onStopPlayer: PropTypes.func.isRequired,
};


export default Episode;
