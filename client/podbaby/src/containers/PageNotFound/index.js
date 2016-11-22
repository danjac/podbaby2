import React, { Component } from 'react';
import { withRouter } from 'react-router';

import NotFound from '../components/NotFound';

export class PageNotFound extends Component {
  render () {
    return <NotFound />;
  }
}

export default withRouter(PageNotFound);
