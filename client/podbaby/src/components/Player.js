import React, { Component, PropTypes } from 'react';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';
import { Link } from 'react-router';

import { episodeShape } from '../propTypes';

import EpisodeButtons from './EpisodeButtons';

import './Player.css';

class Player extends Component {

  constructor(props) {
    super(props);
    this.state = { expanded: true };
    this.handleToggle = this.handleToggle.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    const { episode } = this.props;
    const nextEpisode = nextProps.episode;

    let expanded = false;

    if (nextEpisode) {
      expanded = episode ? (episode.id !== nextEpisode.id) : true;
    }

    if (expanded) {
      this.setState({ expanded });
    }

    return nextProps;
  }

  handleTimeUpdate({ currentTarget }) {
    this.props.onTimeUpdate(currentTarget.currentTime);
  }

  handlePlay({ currentTarget }) {
    currentTarget.currentTime = this.props.currentTime;
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
    const className = 'audio-player ' + (expanded ? 'expanded' : 'contracted');

    const buttons = <EpisodeButtons {...this.props} />;

    return (
      <div className={className}>
          <bs.Panel header={header} footer={buttons}>
           <audio controls
                  autoPlay
                  onPlay={this.handlePlay}
                  onTimeUpdate={this.handleTimeUpdate}
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
  currentTime: PropTypes.number.isRequired,
  onTimeUpdate: PropTypes.func.isRequired,
};

Player.defaultProps = {
  currentTime: 0,
};

export default Player;
