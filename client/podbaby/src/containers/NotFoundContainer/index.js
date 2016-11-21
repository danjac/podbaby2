import React, { Component } from 'react';
import { withRouter } from 'react-router';

import NotFound from '../components/NotFound';

export class NotFoundContainer extends Component {
  render () {
    return <NotFound />;
  }
}

export default withRouter(NotFoundContainer);
