import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Settings from './Settings';
export default connect()(withRouter(Settings));
