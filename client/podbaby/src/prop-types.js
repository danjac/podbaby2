import { PropTypes } from 'react';

export const episodeActionPropTypes = {
  onAddBookmark: PropTypes.func.isRequired,
  onRemoveBookmark: PropTypes.func.isRequired,
  onStopPlayer: PropTypes.func.isRequired,
  onStartPlayer: PropTypes.func.isRequired,
  onSubscribe: PropTypes.func.isRequired,
  onUnsubscribe: PropTypes.func.isRequired,
};

export const channelActionPropTypes = {
  onSubscribe: PropTypes.func.isRequired,
  onUnsubscribe: PropTypes.func.isRequired,
};

export const channelShape = PropTypes.shape({
  id: PropTypes.any.isRequired,
  //subscribed: PropTypes.bool.isRequired,
  // categories: PropTypes.arrayOf(categoryShape),
});

export const userShape = PropTypes.shape({
  username: PropTypes.string.isRequired,
});

export const authPropTypes = {
  authenticated: PropTypes.bool.isRequired,
  user: userShape,
};

export const episodeShape = PropTypes.shape({
  id: PropTypes.any.isRequired,
  playing: PropTypes.bool.isRequired,
  bookmarked: PropTypes.bool.isRequired,
  subscribed: PropTypes.bool.isRequired,
  channel: channelShape.isRequired,
});

export const channelPropTypes = {
  channel: channelShape.isRequired,
  ...channelActionPropTypes,
};

export const channelsPropTypes = {
  channels: PropTypes.arrayOf(channelShape),
  ...channelActionPropTypes,
};

export const episodePropTypes = {
  episode: episodeShape,
  canSubscribe: PropTypes.bool,
  ...episodeActionPropTypes,
};

export const episodesPropTypes = {
  episodes: PropTypes.arrayOf(episodeShape),
  next: PropTypes.number,
  previous: PropTypes.number,
  canSubscribe: PropTypes.bool,
  ...episodeActionPropTypes,
};
