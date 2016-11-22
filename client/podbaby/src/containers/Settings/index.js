import React, { Component } from 'react';
import { withRouter } from 'react-router';

import SettingsPage from '../components/SettingsPage';

export class Settings extends Component {
  render() {
    // const forms = { changePassword: <ChangePassword /> };
    // <Settings forms={forms} />
    return <SettingsPage />;
  }
}

export default withRouter(Settings);
