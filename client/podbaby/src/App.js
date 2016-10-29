import React, {
  Component,
  PropTypes
} from 'react';
// import { bindActionCreators } from 'redux';

import {
  withRouter
} from 'react-router';

import {
  connect
} from 'react-redux';

import './App.css';

export class App extends Component {

  /*

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    const { router, actions } = this.props;
    actions.onLogout();
    router.push("/");
  }
  */

  render() {

    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};


const mapStateToProps = state => {
  return {};
};

/*
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({
      onLogout: logout,
      onDismissAlert: dismissAlert,
      onStopPlayer: stopPlayer,
      onAddBookmark: addBookmark,
      onRemoveBookmark: removeBookmark,
      onSubscribe: subscribe,
      onUnsubscribe: unsubscribe,
    }, dispatch)
  };
};
*/

export default connect(mapStateToProps)(withRouter(App));
