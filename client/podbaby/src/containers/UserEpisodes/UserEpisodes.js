import React, { PropTypes, Component } from 'react';
import { fetchSubscribedEpisodes } from '../../actions/episodes';
import EpisodesPage from '../../components/EpisodesPage';

class UserEpisodes extends Component {

  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate() {
    this.props.dispatch(fetchSubscribedEpisodes());
  }

  render() {

    return <EpisodesPage title='My podcasts'
                         onUpdate={this.handleUpdate} {...this.props} />;
  }
}

UserEpisodes.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default UserEpisodes;
