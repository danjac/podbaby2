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

export const categoryShape = PropTypes.shape({
  id: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
});

export const thumbnailShape = PropTypes.shape({
  url: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
});

export const channelShape = PropTypes.shape({
  id: PropTypes.any.isRequired,
  thumbnail: thumbnailShape,
  subscribed: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(categoryShape),
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
  channel: channelShape,
  ...channelActionPropTypes,
};

export const channelsPropTypes = {
  channels: PropTypes.arrayOf(channelShape),
  ...channelActionPropTypes,
};

export const episodePropTypes = {
  episode: episodeShape,
  authenticated: PropTypes.bool.isRequired,
  withChannel: PropTypes.bool,
  ...episodeActionPropTypes,
};

export const searchPropTypes = {
  searchQuery: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func.isRequired,
  onSelectPage: PropTypes.func.isRequired,
};

export const episodesPropTypes = {
  episodes: PropTypes.arrayOf(episodeShape),
  next: PropTypes.number,
  previous: PropTypes.number,
  authenticated: PropTypes.bool.isRequired,
  withChannel: PropTypes.bool,
  ...episodeActionPropTypes,
};
