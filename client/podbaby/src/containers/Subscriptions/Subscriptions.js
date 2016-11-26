import React, { Component } from 'react';

import ChannelsPage from '../../components/ChannelsPage';

export default class Subscriptions extends Component {
  render() {
    return <ChannelsPage title='My feeds' {...this.props} />;
  }
}
