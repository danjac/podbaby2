import React, { Component } from 'react';

import SettingsPage from '../../components/SettingsPage';

import ChangeEmail from '../ChangeEmail';
import ChangePassword from '../ChangePassword';

export default class Settings extends Component {
  render() {
    const forms = {
      changeEmail: <ChangeEmail />,
      changePassword: <ChangePassword />,
    };
    return <SettingsPage forms={forms}/>;
  }
}


