import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { dismissAlert } from '../../actions/alerts';

import Alerts from './Alerts';

const mapStateToProps = state => {
  return {
    alerts: state.alerts,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    onDismiss: dismissAlert,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Alerts);
