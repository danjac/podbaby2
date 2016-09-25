import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';

import Pager from './pager';
import Episode from './episode';
import Loader from './loader';

class EpisodeList extends Component {

  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    event.preventDefault();
    const query = ReactDOM.findDOMNode(this.refs.search).value.trim();
    this.props.onSearch(query);
  }

  render() {

    if (this.props.isLoading) {
        return <Loader />;
    }
    const { next, previous, episodes, onSelectPager } = this.props;

    const pager = (previous || next) ?
      <Pager next={next} previous={previous} onSelect={onSelectPager} /> : '';

    return (
      <div>
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
  episodes: PropTypes.array.isRequired,
  next: PropTypes.string,
  previous: PropTypes.string,
  player: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSelectPager: PropTypes.func.isRequired,
  onStartPlayer: PropTypes.func.isRequired,
  onStopPlayer: PropTypes.func.isRequired,
};

export default EpisodeList;
