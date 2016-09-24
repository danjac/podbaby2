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
                            title="Stop"
                            onClick={onStopPlayer}>
                            <Icon name="stop" /></bs.Button>);
  } else {
    playerBtn = (<bs.Button key="startBtn"
                            title="Play"
                            onClick={() => onStartPlayer(episode)}>
                            <Icon name="play" /></bs.Button>);
  }

  const downloadBtn = (
    <a key="downloadBtn"
       className="btn btn-default"
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
                  title="Bookmark this episode">
                  <Icon name="star" /></bs.Button>),

      (<bs.Button key="subscribeBtn"
                  title={`Subscribe to ${channel.name}`}>
                  <Icon name="pencil" /></bs.Button>),

    ]];
  };

  buttons = buttons.map(button => (
    <bs.ButtonGroup>{button}</bs.ButtonGroup>
  ));

  const buttonGroup = (
    <bs.ButtonGroup justified>
      {buttons}
    </bs.ButtonGroup>);

  let categories = channel.categories.map(cat => (
    <a href="#" key={cat.id}><bs.Label style={{ display: 'inline-block' }}>{cat.name}</bs.Label>&nbsp;</a>
  ));

  if (episode.explicit) {
    categories = [...categories, [(
      <bs.Label key="explicit" bsStyle="danger" style={{ display: 'inline-block' }}>
        <Icon name="warning" /> Explicit
      </bs.Label>
    )]];
  }

  /*
  const styles = {
    border: "1pt solid #333",
    padding: 5,
    marginBottom: 30,
  };
  */

  const thumbnail = channel.thumbnail || {
    url: defaultThumbnail,
    height: 120,
    width: 120,
  };

  const header = <a href="#">{channel.name}</a>;

  return (
    <bs.Panel header={header} footer={buttonGroup}>
      <bs.Media>
        <bs.Media.Left>
          <img src={thumbnail.url}
               width={thumbnail.width}
               height={thumbnail.height}
               alt={channel.name} />
        </bs.Media.Left>
        <bs.Media.Body>
          <bs.Media.Heading>
            <a href="#">{episode.title}</a>
          </bs.Media.Heading>
          <p>{categories}</p>
        </bs.Media.Body>
      </bs.Media>
      <p>{episode.subtitle}</p>
    </bs.Panel>
  );
};

Episode.propTypes = {
  episode: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onStartPlayer: PropTypes.func.isRequired,
  onStopPlayer: PropTypes.func.isRequired,
};


export default Episode;
