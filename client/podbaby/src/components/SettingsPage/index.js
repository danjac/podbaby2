import React, { Component } from 'react';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';

import './index.css';

class SettingsPage extends Component {

  render() {
    return (
      <div className="settings">

        <bs.Panel bsStyle="primary"
                  header="Change password">
        </bs.Panel>

        <bs.Panel bsStyle="primary"
                  header="Change email address">
        </bs.Panel>

        <bs.Button bsStyle="danger"
                   className="form-control">
          <Icon name="trash" /> Delete my account
        </bs.Button>

      </div>
    );
  }
}

export default SettingsPage;
