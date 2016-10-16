import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';

import sanitize from '../../utils/sanitize';
import Loader from '../../components/loader';
import Categories from '../../components/categories';
import { fetchChannels } from '../../modules/channels';
import { channelsSelector } from '../../selectors';

import defaultThumbnail from '../../podcast.svg';

const Channel = ({ channel }) => {

  const thumbnail = channel.thumbnail || {
    url: defaultThumbnail,
    height: 120,
    width: 120,
  };

  const buttons = (
    <bs.ButtonGroup justified>
      <bs.ButtonGroup>
        <bs.Button key="subscribeBtn"
                   title={`Subscribe to ${channel.name}`}>
                   <Icon name="plus-circle" /></bs.Button>
      </bs.ButtonGroup>
    </bs.ButtonGroup>
  );

  return (
    <bs.Panel header={channel.name} footer={buttons}>
      <bs.Media>
        <bs.Media.Left>
          <img src={thumbnail.url}
               width={thumbnail.width}
               height={thumbnail.height}
               alt={channel.name} />
        </bs.Media.Left>
        <bs.Media.Body>
          <Categories categories={channel.categories}
                      explicit={channel.explicit} />
        </bs.Media.Body>
      </bs.Media>
      <p style={{ marginTop: 10 }}
         dangerouslySetInnerHTML={sanitize(channel.description)}></p>
    </bs.Panel>
  );

};

Channel.propTypes = {
  channel: PropTypes.object.isRequired,
};

export class Channels extends Component {

  componentDidMount() {
    this.props.actions.onFetchChannels('/api/channels/');
  }

  render() {

    const { isLoading, channels } = this.props;

    if (isLoading) {
      return <Loader />;
    }

    return (
      <div>
        <bs.PageHeader>Feeds</bs.PageHeader>
        {channels.map(channel => (
        <Channel key={channel.id} channel={channel} />
        ))}
      </div>
    );
  }

}

Channels.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  channels: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  const {
    auth: { isLoggedIn },
    channels: { isLoading },
  } = state;
  const channels = channelsSelector(state);
  return {
    isLoggedIn,
    channels,
    isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({
      onFetchChannels: fetchChannels,
    }, dispatch),
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Channels));
