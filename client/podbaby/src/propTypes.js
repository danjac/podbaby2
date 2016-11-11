import { PropTypes } from 'react';

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

export const episodeShape = PropTypes.shape({
  id: PropTypes.any.isRequired,
  playing: PropTypes.bool.isRequired,
  bookmarked: PropTypes.bool.isRequired,
  channel: channelShape,
});

export const alertShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
});

export const channelDetailShape = PropTypes.shape({
  channel: channelShape,
  episodes: PropTypes.arrayOf(episodeShape),
});
