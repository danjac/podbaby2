import React, { Component, PropTypes } from 'react';

import Navigation from '../Navigation';
import Alerts from '../Alerts';
import Player from '../Player';

class App extends Component {

  render() {

    return (
      <div className="container">
        <Navigation />
        <Alerts />
        {this.props.children}
        <Player />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};


export default App;
