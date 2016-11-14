import React, { Component } from 'react';
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

    // placeholder
    const onPlay = ({ currentTarget }) => currentTarget.currentTime = 0;

    const buttons = <EpisodeButtons {...this.props} />;

    return (
      <div className={className}>
          <bs.Panel header={header} footer={buttons}>
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
