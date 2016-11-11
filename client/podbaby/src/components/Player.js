import React, { Component } from 'react';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';
import { Link } from 'react-router';

import { episodeShape } from '../propTypes';

import EpisodeButtons from './EpisodeButtons';

class Player extends Component {

  constructor(props) {
    super(props);
    this.state = { expanded: true };
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    const { episode } = this.props;
    const { nextEpisode } = nextProps;

    const expand = (
      (episode && episode.id) !== (nextEpisode && nextEpisode.id)
    );

    if (expand) {
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

    let title = episode.channel.name;

    if (episode.title) {
      title += ":" + episode.title;
    }

    const header = <Link to={`/podcasts/${episode.id}/`}>{title}</Link>;

    const { expanded } = this.state;

    // placeholder
    const onPlay = ({ currentTarget }) => currentTarget.currentTime = 0;

    // we need to hide the audio in CSS - will stop playing if
    // removed from DOM

    const containerStyle = expanded ? {} : {
      left: '85%',
      width: '15%',
    };

    const panelStyle = expanded ? {} : {
      display: 'none',
    };

    const buttons = <EpisodeButtons {...this.props} />;

    return (
      <div className="audio-player"
           style={containerStyle}>
          <bs.Panel header={header}
                    footer={buttons}
                    style={panelStyle}>
           <audio controls
                  autoPlay
                  onPlay={onPlay}
                  src={episode.streamUrl}>
             <source src={episode.streamUrl}
                     type={episode.enclosureType} />
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
  episode: episodeShape,
};

export default Player;
