import React, { Component, PropTypes } from 'react';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';
import Buttons from './episode-buttons';

class Player extends Component {

  constructor(props) {
    super(props);
    this.state = { expanded: true };
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.episode !== this.props.episode) {
      this.setState({ expanded: true });
    }
    return nextProps;
  }

  handleToggle() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { episode } = this.props;

    if (!episode) {
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

    // we need to hide the audio in CSS - will stop playing if
    // not in DOM
    const styles = expanded ? {} : { display: 'none' };

    const buttons = <Buttons {...this.props} episode={episode} />;

    return (
      <div className="audio-player" style={expanded ? {} : {
        left: '85%',
        width: '15%'
        }}>
          <bs.Panel header={title}
            footer={buttons}
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
  episode: PropTypes.any,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Player;
