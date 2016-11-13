import React from 'react';
import { Link } from 'react-router';
import * as bs from 'react-bootstrap';

import { channelShape } from '../propTypes';
import defaultThumbnail from './podcast.svg';
import Labels from './Labels';
import ChannelButtons from './ChannelButtons';
import { sanitize } from './utils';

import './ChannelListItem.css';

export const ChannelListItem = props => {

  const { channel } = props;

  const thumbnail = channel.thumbnail || {
    url: defaultThumbnail,
    height: 120,
    width: 120,
  };

  const description = sanitize(channel.description || '');

  const buttons = <ChannelButtons {...props } />;
  const header = <Link to={`/feeds/${channel.id}/`}>{channel.name}</Link>;

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
      <p dangerouslySetInnerHTML={description}></p>
    </bs.Panel>
  );
};

ChannelListItem.propTypes = {
  channel: channelShape,
};

export default ChannelListItem;
