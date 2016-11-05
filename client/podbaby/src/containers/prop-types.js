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


