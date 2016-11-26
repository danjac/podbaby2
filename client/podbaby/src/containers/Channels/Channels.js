import React, { PropTypes, Component } from 'react';
import ChannelsPage from '../../components/ChannelsPage';

class Channels extends Component {
  render() {
    const { authenticated } = this.props;
    const title = authenticated ? 'All feeds' : 'Feeds';
    return <ChannelsPage title={title} {...this.props} />;
  }
}

Channels.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default Channels;
