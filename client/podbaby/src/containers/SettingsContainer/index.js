import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Settings from '../components/Settings';

export class SettingsContainer extends Component {
  render() {
    // const forms = { changePassword: <ChangePasswordContainer /> };
    // <Settings forms={forms} />
    return <Settings />;
  }
}

export default withRouter(SettingsContainer);
