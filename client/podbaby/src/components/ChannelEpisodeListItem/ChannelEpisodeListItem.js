import React, { Component } from 'react';
import { Link } from 'react-router';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';

import { episodeShape } from '../../propTypes';
import EpisodeButtons from '../EpisodeButtons';
import EpisodeDates from '../EpisodeDates';
import Description from '../Description';

import './ChannelEpisodeListItem.css';

class ChannelEpisodeListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showDescription: false,
    };
    this.handleToggleDescription = this.handleToggleDescription.bind(this);
  }

  handleToggleDescription() {
    this.setState({
      showDescription: !this.state.showDescription,
    });
  }

  render() {
    const { episode } = this.props;

    const description = episode.subtitle || episode.summary || episode.description;

    const buttons = <EpisodeButtons {...this.props } withChannel={false} />;

    const header = (
      <Link to={`/podcasts/${episode.id}/`}>
      {episode.title || 'Podcast'}
    </Link>);

    const { showDescription } = this.state;

    return (
      <bs.Panel header={header}
              footer={buttons}
              className="episode">

      {episode.explicit && (
      <bs.Label key="explicit" bsStyle="danger">
        <Icon name="warning" /> Explicit
      </bs.Label>)}
      <EpisodeDates episode={episode} />
      {description && (
        <div className="description-toggle">
          <bs.Button
            className="form-control"
            onClick={this.handleToggleDescription}
          >
            <Icon name={showDescription ? 'compress': 'expand'} />
          </bs.Button>
        </div>
      )}
      {showDescription && <Description content={description} />}
    </bs.Panel>
    );
  }
};

ChannelEpisodeListItem.propTypes = {
  episode: episodeShape,
};


export default ChannelEpisodeListItem;
