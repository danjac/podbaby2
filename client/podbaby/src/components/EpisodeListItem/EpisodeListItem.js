import React, { Component } from 'react';
import { Link } from 'react-router';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';

import { episodeShape } from '../../propTypes';
import defaultThumbnail from '../../assets/podcast.svg';

import Description from '../Description';
import Labels from '../Labels';
import EpisodeButtons from '../EpisodeButtons';
import EpisodeDates from '../EpisodeDates';

import './EpisodeListItem.css';

class EpisodeListItem extends Component {

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
    const { episode, episode: { channel } } = this.props;

    const thumbnail = channel.thumbnail || {
      url: defaultThumbnail,
      height: 120,
      width: 120,
    };

    const description = episode.subtitle || episode.summary || episode.description;

    const title = episode.title || channel.name;
    const buttons = <EpisodeButtons {...this.props } />;
    const header = <Link to={`/podcasts/${episode.id}/`}>{title}</Link>;

    const { showDescription } = this.state;

    return (
      <bs.Panel header={header}
              footer={buttons}
              className="episode">

      <h2 className="channel-name">
        <Link to={`/feeds/${channel.id}/`}>{channel.name}</Link>
      </h2>
      <bs.Media>
        <bs.Media.Left>
          <img src={thumbnail.url}
               width={thumbnail.width}
               height={thumbnail.height}
               alt={channel.name} />
        </bs.Media.Left>
        <bs.Media.Body>
          <Labels categories={channel.categories}
                  explicit={episode.explicit} />
        </bs.Media.Body>
      </bs.Media>
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

EpisodeListItem.propTypes = {
  episode: episodeShape,
};

export default EpisodeListItem;
