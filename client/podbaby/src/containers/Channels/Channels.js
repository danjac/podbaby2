import React, { Component } from 'react';
import ChannelsPage from '../../components/ChannelsPage';

export default class Channels extends Component {
  render() {
    return <ChannelsPage header='All feeds' {...this.props} />;
  }
}
