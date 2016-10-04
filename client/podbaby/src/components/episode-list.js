import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';

import { startPlayer, stopPlayer } from '../modules/player';
import { addBookmark, removeBookmark } from '../modules/auth';

import { parsePageNumberFromUrl } from '../utils/pagination';

import Pager from './pager';
import Episode from './episode';
import Loader from './loader';

class EpisodeList extends Component {

  render() {

    const {
      next,
      previous,
      episodes,
    } = this.props;

    const pager = (previous || next) && (
      <Pager next={next}
             previous={previous}
             onSelect={this.handleSelectPager} />);


    const actions = bindActionCreators({
      onAddBookmark: addBookmark,
      onRemoveBookmark: removeBookmark,
      onStartPlayer: startPlayer,
      onStopPlayer: stopPlayer,
    }, dispatch);

    return (
      <div>
        {header}
        <form onSubmit={this.handleSearch}>
          <bs.FormGroup>
            <bs.FormControl type="search"
                            ref="search"
                            placeholder="Find a podcast..." />
          </bs.FormGroup>
          <bs.Button className="form-control"
                     type="submit"
                     bsStyle="primary">
            <Icon name="search" />
          </bs.Button>
        </form>
        <div style={{ marginTop: 10 }}>
          {pager}
          {episodes.map(episode => (
          <Episode key={episode.id}
                   episode={episode}
                   {...actions}
                   {...this.props} />
          ))}
          {pager}
        </div>
      </div>
    );
  }
};

EpisodeList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  episodes: PropTypes.array.isRequired,
  fetchEpisodes: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  header: PropTypes.any,
  next: PropTypes.string,
  previous: PropTypes.string,
};

export default EpisodeList;
