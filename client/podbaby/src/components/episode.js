import React, { PropTypes } from 'react';
import Icon from 'react-fa';
import * as bs from 'react-bootstrap';

import defaultThumbnail from '../podcast.svg';

export const Episode = props => {
  const {
    episode,
    episode: { channel },
    isLoggedIn,
    onStartPlayer,
    onStopPlayer } = props;

  let playerBtn;

  if (episode.isPlaying) {
    playerBtn = (<bs.Button key="stopBtn"
                            bsSize="small"
                            title="Stop"
                            onClick={onStopPlayer}>
                            <Icon name="stop" /></bs.Button>);
  } else {
    playerBtn = (<bs.Button key="startBtn"
                            bsSize="small"
                            title="Play"
                            onClick={() => onStartPlayer(episode)}>
                            <Icon name="play" /></bs.Button>);
  }

  const downloadBtn = (
    <a key="downloadBtn"
       className="btn btn-sm btn-default"
       title="Download this podcast"
       href={episode.enclosureUrl}>
      <Icon name="download" />
    </a>);


  let buttons = [
    playerBtn,
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

  let categories = channel.categories.map(cat => (
      <a href="#" key={cat.id}><bs.Label>{cat.name}</bs.Label>&nbsp;</a>
  ));

  if (episode.explicit) {
    categories = [...categories, [(
      <bs.Label key="explicit" bsStyle="danger">
        <Icon name="warning" /> Explicit
      </bs.Label>
    )]];
  }

  const styles = {
    border: "1pt solid #333",
    padding: 5,
    marginBottom: 30,
  };

  const thumbnail = channel.thumbnail || {
    url: defaultThumbnail,
    height: 120,
    width: 120,
  };

  return (
    <bs.Media style={styles}>
      <bs.Media.Left>
        <img src={thumbnail.url}
             width={thumbnail.width}
             height={thumbnail.height}
             alt={channel.name} />
      </bs.Media.Left>
      <bs.Media.Body>
        <bs.Media.Heading>
          <a href="#">{channel.name}</a>
          {buttonGroup}
        </bs.Media.Heading>
        <h5><a href="#">{episode.title}</a></h5>
        <p>{categories}</p>
        <p>{episode.subtitle}</p>
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
