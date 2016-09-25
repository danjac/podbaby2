import React, { Component, PropTypes } from 'react';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';

class Player extends Component {

  constructor(props) {
    super(props);
    this.state = { expanded: true };
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.player !== this.props.player && nextProps.player.isPlaying) {
      this.setState({ expanded: true });
    }
    return nextProps;
  }

  handleToggle() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const {
      player: {
        isPlaying,
        episode,
      },
      onStopPlayer,
      isLoggedIn } = this.props;

    if (!isPlaying || !episode) {
      return <div></div>;
    }

    const { channel } = episode;

    let title = channel.name;

    if (episode.title) {
      title += ":" + episode.title;
    }

    const { expanded } = this.state;

    const onPlay = ({ currentTarget }) => {
      currentTarget.currentTime = 0;
    };

    const stopBtn = (
      <bs.Button key="stopBtn"
                 title="Stop"
                 onClick={onStopPlayer}>
                 <Icon name="stop" /></bs.Button>);

    const downloadBtn = (
      <a key="downloadBtn"
         className="btn btn-default"
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

    const buttonGroup = expanded && (
      <bs.ButtonGroup justified>
        {buttons}
      </bs.ButtonGroup>);

    // we need to hide the audio in CSS - will stop playing if
    // not in DOM
    const styles = expanded ? {} : { display: 'none' };

    return (
      <div className="audio-player" style={expanded ? {} : {
        left: '85%',
        width: '15%'
        }}>
          <bs.Panel header={title}
                    footer={buttonGroup}
                    style={styles}>
           <audio controls
                  autoPlay
                  onPlay={onPlay}
                  src={episode.streamUrl}>
            <source src={episode.streamUrl} type={episode.enclosureType} />
          </audio>
        </bs.Panel>
        <bs.Button bsStyle="primary"
                   onClick={this.handleToggle}
                   title={expanded ? "Hide player" : "Playing: " + title}
                   className="form-control">
           <Icon name={expanded ? 'compress' : 'expand'} />
        </bs.Button>
      </div>
    );
  }
};

Player.propTypes = {
  onStopPlayer: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Player;
