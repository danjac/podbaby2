import React, { Component } from 'react';
import { Link } from 'react-router';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';

import { channelShape } from '../../propTypes';
import defaultThumbnail from '../../assets/podcast.svg';

import Labels from '../Labels';
import ChannelButtons from '../ChannelButtons';
import ChannelLinks from '../ChannelLinks';
import Description from '../Description';

import './ChannelListItem.css';

class ChannelListItem extends Component {

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
    const { channel } = this.props;

    const thumbnail = channel.thumbnail || {
      url: defaultThumbnail,
      height: 120,
      width: 120,
    };

    const buttons = <ChannelButtons {...this.props } />;
    const header = <Link to={`/feeds/${channel.id}/`}>{channel.name}</Link>;

    const { showDescription } = this.state;

    return (
      <bs.Panel header={header}
              footer={buttons}
              className="channel">

      <bs.Media>
        <bs.Media.Left>
          <img src={thumbnail.url}
               width={thumbnail.width}
               height={thumbnail.height}
               alt={channel.name} />
        </bs.Media.Left>
        <bs.Media.Body>
          <Labels categories={channel.categories}
                  explicit={channel.explicit} />
        </bs.Media.Body>
      </bs.Media>
      <ChannelLinks channel={channel} />
      {channel.description && (
        <div className="description-toggle">
          <bs.Button
            className="form-control"
            onClick={this.handleToggleDescription}
          >
            <Icon name={showDescription ? 'compress': 'expand'} />
          </bs.Button>
        </div>
      )}
      {showDescription && <Description content={channel.description} />}
    </bs.Panel>
    );
  }
};

ChannelListItem.propTypes = {
  channel: channelShape,
};

export default ChannelListItem;
