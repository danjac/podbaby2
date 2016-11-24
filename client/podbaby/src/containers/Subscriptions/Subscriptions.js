import React, { Component } from 'react';

import ChannelsPage from '../../components/ChannelsPage';

export default class Subscriptions extends Component {
  render() {
    return <ChannelsPage header='My feeds' {...this.props} />;
  }
}
