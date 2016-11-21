import React, { PropTypes, Component } from 'react';
import * as bs from 'react-bootstrap';

import { channelShape } from '../../propTypes';

import SearchForm from '../SearchForm';
import Loader from '../Loader';
import Description from '../Description';
import EpisodeList from '../EpisodeList';
import Labels from '../Labels';
import ChannelEpisodeListItem from '../ChannelEpisodeListItem';
import ChannelButtons from '../ChannelButtons';
import ChannelLinks from '../ChannelLinks';
import NotFound from '../NotFound';

import defaultThumbnail from './podcast.svg';
import './index.css';

class ChannelDetail extends Component {

  render() {

    const {
      channel,
      channelLoading,
      episodesLoading,
      searchQuery,
      error,
    } = this.props;

    if (error) {
      return <NotFound />;
    }

    if (channelLoading || !channel) {
      return <Loader />;
    }

    const thumbnail = channel.thumbnail || {
      url: defaultThumbnail,
      height: 120,
      width: 120,
    };

    const ifEmpty = searchQuery ? 'Sorry, no results found for your search' : 'This feed does not have any podcasts';

    const episodes = episodesLoading ? <Loader /> : (
      <div>
        <SearchForm placeholder="Search for podcasts" {...this.props} />

        <EpisodeList ifEmpty={ifEmpty}
                     component={ChannelEpisodeListItem}
                     {...this.props} />
      </div>
    );

    const buttons = <ChannelButtons {...this.props} />;
    const header = <h3 className="panel-title">{channel.name}</h3>;

    return (
      <div>
        <bs.Panel bsStyle="primary"
                  header={header}
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
          <Description content={channel.description} />
        </bs.Panel>
        {episodes}
      </div>
    );
  }
}

ChannelDetail.propTypes = {
  channel: channelShape,
  error: PropTypes.object,
  searchQuery: PropTypes.string,
  channelLoading: PropTypes.bool.isRequired,
  episodesLoading: PropTypes.bool.isRequired,
};

export default ChannelDetail;
