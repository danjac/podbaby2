import React, { PropTypes } from 'react';
import Icon from 'react-fa';
import moment from 'moment';
import * as bs from 'react-bootstrap';

import sanitize from '../utils/sanitize';

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
                  title="Bookmark this podcast">
                  <Icon name="star" /></bs.Button>),

      (<bs.Button key="subscribeBtn"
                  title={`Subscribe to ${channel.name}`}>
                  <Icon name="plus" /></bs.Button>),

    ]];
  };

  buttons = buttons.map((btn, index) => (
    <bs.ButtonGroup key={index}>{btn}</bs.ButtonGroup>
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

  const thumbnail = channel.thumbnail || {
    url: defaultThumbnail,
    height: 120,
    width: 120,
  };

  const header = channel.name;

  const published = episode.published && moment(episode.published).format(
    'MMMM Do YYYY'
  );

  return (
    <bs.Panel header={header}
              footer={buttonGroup}
              className="episode">
      <h4 style={{ textAlign: 'center' }}>
        <a href="#">{episode.title}</a>
      </h4>
      <bs.Media>
        <bs.Media.Left>
          <img src={thumbnail.url}
               width={thumbnail.width}
               height={thumbnail.height}
               alt={channel.name} />
        </bs.Media.Left>
        <bs.Media.Body>
          <p>{categories}</p>
          {published && <p><strong>{published}</strong></p>}
        </bs.Media.Body>
      </bs.Media>
      <p style={{ marginTop: 10 }}
         dangerouslySetInnerHTML={sanitize(episode.subtitle)}></p>
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
