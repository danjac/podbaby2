import React, { PropTypes, Component } from 'react';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';

import {
  channelShape,
} from '../propTypes';

import SearchForm from './SearchForm';
import Loader from './Loader';
import EpisodeList from './EpisodeList';
import Labels from './Labels';
import ChannelEpisodeListItem from './ChannelEpisodeListItem';
import { sanitize } from './utils';

import defaultThumbnail from './podcast.svg';

class ChannelDetail extends Component {

  render() {

    const {
      channel,
      channelLoading,
      episodesLoading,
      searchQuery,
      error,
      authenticated,
      onSubscribe,
      onUnsubscribe,
    } = this.props;

    if (error) {
      return (
        <bs.Jumbotron>
          <h2>Feed not found</h2>
          <p>Sorry, this podcast feed cannot be found.</p>
        </bs.Jumbotron>
      );
    }

    if (channelLoading || !channel) {
      return <Loader />;
    }

    const thumbnail = channel.thumbnail || {
      url: defaultThumbnail,
      height: 120,
      width: 120,
    };

    const description = sanitize(channel.description || '');

    const ifEmpty = searchQuery ? 'Sorry, no results found for your search' : 'This feed does not have any podcasts';

    const episodes = episodesLoading ? <Loader /> : (
      <div>
        <SearchForm placeholder="Search for podcasts" {...this.props} />

        <EpisodeList ifEmpty={ifEmpty}
                     component={ChannelEpisodeListItem}
                     {...this.props} />
      </div>
    );

    let subscriptionBtn;

    if (authenticated) {
      if (channel.subscribed) {
        subscriptionBtn = (
          <bs.Button className="form-control"
                     onClick={() => onUnsubscribe(channel)}>
                       <Icon name="minus-circle" /> Unsubscribe</bs.Button>);
      } else {
        subscriptionBtn = (
          <bs.Button className="form-control"
                     onClick={() => onSubscribe(channel)}>
                       <Icon name="plus-circle" /> Subscribe</bs.Button>);
      }

    }

    return (
      <div>
        <bs.PageHeader>{channel.name}</bs.PageHeader>
        <bs.Panel footer={subscriptionBtn}>
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
          <bs.ButtonGroup justified style={{ marginTop: 10 }}>
            {channel.link && (
            <a href={channel.link} className="btn btn-default btn-sm">
              <Icon name="globe" /> Website
            </a>)}
            <a href={channel.rssFeed} className="btn btn-default btn-sm">
              <Icon name="rss" /> RSS
            </a>
          </bs.ButtonGroup>
        <p className="episode-description" style={{ marginTop: 10 }}
           dangerouslySetInnerHTML={description}></p>
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
  onSubscribe: PropTypes.func.isRequired,
  onUnsubscribe: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  channelLoading: PropTypes.bool.isRequired,
  episodesLoading: PropTypes.bool.isRequired,
};

export default ChannelDetail;
