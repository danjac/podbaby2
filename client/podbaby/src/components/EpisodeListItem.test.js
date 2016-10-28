import React from 'react';
import { shallow } from 'enzyme';
import * as bs from 'react-bootstrap';
import { EpisodeListItem } from './EpisodeListItem';

const defaultProps = {
  episode: {
    explicit: true,
    isPlaying: false,
    channel: {
      name: 'The Joe Rogan Experience',
      thumbnail: {
        url: 'test.jpg',
        height: 120,
        width: 120,
      },
      categories: [
        {
          id: 1,
          name: 'Comedy',
        },
      ],
    },
    title: 'Brian Redban',
    subtitle: 'Joe & Redban talk shit',
  },
  isLoggedIn: false,
  onStartPlayer: jest.fn(),
  onStopPlayer: jest.fn(),
  onAddBookmark: jest.fn(),
  onRemoveBookmark: jest.fn(),
};

it('should render the component', () => {
  // smoke test
  const rendered = shallow(<EpisodeListItem {...defaultProps} />);
  expect(rendered.find(bs.Panel).length).toEqual(1);
});

it('should render the channel thumbnail if provided', () => {
  const rendered = shallow(<EpisodeListItem {...defaultProps} />);
  const img = rendered.find('img');
  expect(img.prop('src')).toBe('test.jpg');
});

it('should render the default thumbnail if not provided', () => {
  const channel = { ...defaultProps.episode.channel, thumbnail: null};
  const episode = { ...defaultProps.episode, channel };
  const rendered = shallow(<EpisodeListItem {...defaultProps} episode={episode} />);
  const img = rendered.find('img');
  expect(img.prop('src')).not.toContain('test.jpg');
});


