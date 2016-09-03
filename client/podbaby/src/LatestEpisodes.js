import React, { Component } from 'react';
import { Icon } from 'react-fa';
import { withRouter } from 'react-router';
import * as bs from 'react-bootstrap';
import * as api from './api';

const Episode = props => {
  const { episode, player, onStart, onStop } = props;
  const { channel } = episode;
  const isPlaying = player && player.episode.id === episode.id;

  let style = {}
  let button;

  if (isPlaying) {
    style.backgroundColor = '#eee';
    button = <bs.Button bsStyle="primary" onClick={onStop}><Icon name="stop" /></bs.Button>;
  } else {
    button = <bs.Button bsStyle="primary" onClick={() => onStart(episode)}><Icon name="play" /></bs.Button>;
  }

  return (
    <bs.Media style={style}>
      <bs.Media.Left>
        <img src={channel.thumbnail.url}
             width={channel.thumbnail.width}
             height={channel.thumbnail.height}
             alt={channel.name} />
      </bs.Media.Left>
      <bs.Media.Body>
        <bs.Media.Heading>{channel.name}</bs.Media.Heading>
        <h4>{episode.title}</h4>
        <p>
          {episode.subtitle}
        </p>
        <p>
          {channel.categories.map(cat => (
          <a href="#" key={cat.id}><bs.Label>{cat.name}</bs.Label>&nbsp;</a>
          ))}
          {episode.explicit ? <bs.Label bsStyle="danger"><Icon name="warning" /> Explicit</bs.Label> : ''}
          {button}
        </p>
      </bs.Media.Body>
    </bs.Media>
  );
};

Episode.propTypes = {
  episode: React.PropTypes.object.isRequired,
};


const Pager = props => {
  const { onSelect, next, previous } = props;

  const onSelectPrevious = () => onSelect(previous);
  const onSelectNext = () => onSelect(next);

  return (
    <bs.Pager>
      <bs.Pager.Item previous onSelect={onSelectPrevious} disabled={!previous}>&larr; Previous</bs.Pager.Item>
      <bs.Pager.Item next onSelect={onSelectNext} disabled={!next}>Next &rarr;</bs.Pager.Item>
    </bs.Pager>
  );
};

Pager.propTypes = {
  next: React.PropTypes.string,
  previous: React.PropTypes.string,
  onSelect: React.PropTypes.func.isRequired,
};


const extractPageNumberFromUrl = url => {
  const match = /.*?[\?&]page=(\d+).*?/.exec(url);
  if (match) {
    return Number(match[1]).valueOf();
  }
  return null;
};

class LatestEpisodes extends Component {

  constructor(props) {
    super(props);
    this.state = { results: [], isWaiting: true };
    this.onSelectPager = this.onSelectPager.bind(this);

  }

  componentDidMount() {
     this.getStateFromStore(null);
  }

  componentWillReceiveProps(nextProps) {
     this.getStateFromStore(null, nextProps);
  }

  onSelectPager(url) {
    this.getStateFromStore(url);
  }

  getStateFromStore(url, props) {

    props = props || this.props;

    if (url) {
      const pageNumber = extractPageNumberFromUrl(url);
      if (pageNumber) {
        props.router.replace({ query: { page: pageNumber }})
      }
    } else {
      const page = props.location.query.page || 1;
      url = '/api/episodes/?page=' + page;
    }

    this.setState({ isWaiting: true });

    api.get(url)
    .then(response => this.setState({isWaiting: false, ...response}));
  }

  render() {

    if (this.state.isWaiting) {
        return <h1>Waiting...</h1>;
    }

    const pager = this.state.previous || this.state.next ?
      <Pager {...this.state} onSelect={this.onSelectPager} /> : '';

    return (
      <div>
          {pager}
          {this.state.results.map(episode => (
          <Episode key={episode.id}
                   episode={episode}
                   onStart={this.onStartPlayer}
                   onStop={this.onStopPlayer}
                   player={this.state.player} />
          ))}
          {pager}
      </div>
    );
  }
}

export default withRouter(LatestEpisodes);
