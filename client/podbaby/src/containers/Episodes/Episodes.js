import React, { PropTypes, Component } from 'react';

import { fetchAllEpisodes } from '../../actions/episodes';
import EpisodesPage from '../../components/EpisodesPage';

class Episodes extends Component {

  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate() {
    this.props.dispatch(fetchAllEpisodes());
  }

  render() {

    const { authenticated } = this.props;

    const title = authenticated ? 'All podcasts' : 'Podcasts';

    return <EpisodesPage
      title={title}
      onUpdate={this.handleUpdate} {...this.props}
      />;
  }
}

Episodes.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Episodes;
