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

  constructor(props) {
    super(props);
    this.handleSelectPager = this.handleSelectPager.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    const { page, q } = this.props.location.query;
    this.props.fetchEpisodes(page || 1, q);
  }

  componentWillReceiveProps(nextProps) {

    const thisQuery = this.props.location.query;
    const nextQuery = nextProps.location.query;

    if (thisQuery !== nextQuery) {
      const { page, q } = nextQuery;
      this.props.fetchEpisodes(page, q);
    }

  }

  handleSearch(event) {
    event.preventDefault();
    const query = ReactDOM.findDOMNode(this.refs.search).value.trim();
    this.props.router.replace({
      query: {
        page: 1,
        q: query,
      },
      pathname: this.props.location.pathname,
    });
  }

  handleSelectPager(url) {
    const page = parsePageNumberFromUrl(url);
    const query = {...this.props.location.query, page };
    this.props.router.replace({ query });
  }

  render() {

    if (this.props.isLoading) {
        return <Loader />;
    }
    const {
      header,
      next,
      previous,
      episodes,
      dispatch,
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
