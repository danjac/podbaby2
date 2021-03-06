import React, { Component, PropTypes } from 'react';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';

import './SettingsPage.css';

class SettingsPage extends Component {

  render() {
    const { forms, onDeleteAccount } = this.props;
    return (
      <div className="settings">

        <bs.Panel bsStyle="primary"
                  header="Change email address">
          {forms.changeEmail}
        </bs.Panel>

        <bs.Panel bsStyle="primary"
                  header="Change password">
          {forms.changePassword}
        </bs.Panel>

        <bs.Button bsStyle="danger"
                   onClick={onDeleteAccount}
                   className="form-control">
          <Icon name="trash" /> Delete my account
        </bs.Button>

      </div>
    );
  }
}

SettingsPage.propTypes = {
  onDeleteAccount: PropTypes.func.isRequired,
  forms: PropTypes.object.isRequired,
};

export default SettingsPage;
