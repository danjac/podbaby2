import React, { PropTypes, Component } from 'react';
import { routerShape } from 'react-router/lib/PropTypes';

import { info } from '../../actions/alerts';
import { deleteAccount } from '../../actions/auth';
import SettingsPage from '../../components/SettingsPage';

import ChangeEmail from '../ChangeEmail';
import ChangePassword from '../ChangePassword';

class Settings extends Component {

  constructor(props) {
    super(props);
    this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
  }

  handleDeleteAccount() {
    if (window.confirm('Are you sure you want to delete your account?')) {
      this.props.dispatch(deleteAccount());
      this.props.dispatch(info('Your account has been deleted.'));
      this.props.router.push('/');
    }
  }

  render() {
    const forms = {
      changeEmail: <ChangeEmail />,
      changePassword: <ChangePassword />,
    };
    return <SettingsPage
      forms={forms}
      onDeleteAccount={this.handleDeleteAccount}
      />;
  }
}

Settings.propTypes = {
  dispatch: PropTypes.func.isRequired,
  router: routerShape.isRequired,
};

export default Settings;
