import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import App from './App';

export default connect()(withRouter(App));
