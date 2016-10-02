import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as bs from 'react-bootstrap';

import { fetchEpisode } from '../modules/episode';

export class EpisodeDetail extends Component {

  componentDidMount() {
    this.fetchEpisode(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchEpisode(nextProps);
  }

  fetchEpisode(props) {
    const { params, dispatch } = props;
    dispatch(fetchEpisode(params.id));
  }

  render() {
    const {
      isLoggedIn,
      episode,
      episode:
      { channel },
    } = this.props;

    let playerBtn;

    if (episode.isPlaying) {
      playerBtn = (<bs.Button key="stopBtn"
                              title="Stop"
                              onClick={this.handleStopPlayer}>
                              <Icon name="stop" /></bs.Button>);
    } else {
      playerBtn = (<bs.Button key="startBtn"
                              title="Play"
                              onClick={this.handleStartPlayer}>
                              <Icon name="play" /></bs.Button>);
    }

    const downloadBtn = (
      <a key="downloadBtn"
         className="btn btn-default"
         title="Download this podcast"
         href={episode.enclosureUrl}>
        <Icon name="download" />
      </a>);

    let buttons = [
      playerBtn,
      downloadBtn,
    ];

    if (isLoggedIn) {

      let bookmarkBtn;

      if (episode.isBookmarked) {

        bookmarkBtn = (
          <bs.Button key="bookmarkBtn"
                     onClick={this.handleRemoveBookmark}
                     title="Remove bookmark">
                     <Icon name="star" /></bs.Button>)
      } else {

        bookmarkBtn = (
          <bs.Button key="bookmarkBtn"
                     onClick={this.handleAddBookmark}
                     title="Bookmark this podcast">
                     <Icon name="star-o" /></bs.Button>)
      }

      buttons = [...buttons, ...[
        bookmarkBtn,
        (<bs.Button key="subscribeBtn"
                    title={`Subscribe to ${channel.name}`}>
                    <Icon name="plus" /></bs.Button>),

      ]];
    };

    buttons = buttons.map((btn, index) => (
      <bs.ButtonGroup key={index}>{btn}</bs.ButtonGroup>
    ));

    const buttonGroup = (
      <bs.ButtonGroup justified>
        {buttons}
      </bs.ButtonGroup>);

    let categories = channel.categories.map(cat => (
      <a href="#" key={cat.id}><bs.Label style={{ display: 'inline-block' }}>{cat.name}</bs.Label>&nbsp;</a>
    ));

    if (episode.explicit) {
      categories = [...categories, [(
        <bs.Label key="explicit" bsStyle="danger" style={{ display: 'inline-block' }}>
          <Icon name="warning" /> Explicit
        </bs.Label>
      )]];
    }

    const thumbnail = channel.thumbnail || {
      url: defaultThumbnail,
      height: 120,
      width: 120,
    };

    const header = channel.name;

    const published = episode.published && moment(episode.published).format(
      'MMMM Do YYYY'
    );

    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <h2>{episode.title}</h2>
          <h3><a href="#">{channel.name}</a></h3>
        </div>
        <bs.Media>
          <bs.Media.Left>
            <img src={thumbnail.url}
                 width={thumbnail.width}
                 height={thumbnail.height}
                 alt={channel.name} />
          </bs.Media.Left>
          <bs.Media.Body>
            <p>{categories}</p>
            {published && <p><strong>{published}</strong></p>}
          </bs.Media.Body>
        </bs.Media>
        <p style={{ marginTop: 10 }}
           dangerouslySetInnerHTML={sanitize(episode.description)}></p>
         {buttons}
      </div>
    );

    }
}

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(EpisodeDetail));
