import React, { Component } from 'react';

import SettingsPage from '../../components/SettingsPage';
import ChangeEmail from '../ChangeEmail';

export default class Settings extends Component {
  render() {
    const forms = {
      changeEmail: <ChangeEmail />,
    };
    return <SettingsPage forms={forms}/>;
  }
}


