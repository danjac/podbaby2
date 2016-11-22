import React, { Component } from 'react';

import AlertList from '../../components/AlertList';

export default class Alerts extends Component {
  render() {
    return <AlertList {...this.props} />;
  }
}
