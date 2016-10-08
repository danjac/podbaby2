import React from 'react';
import { shallow } from 'enzyme';

import Pager from './pager';
import Episode from './episode';
import EpisodeList from './episode-list';


const defaultProps = {
  next: '/?page=3',
  previous: '/?page=1',
  onSelectPage: jest.fn(),
  episodes: [{
    id: 1,
    explicit: true,
    isPlaying: false,
    channel: {
      name: 'The Joe Rogan Experience',
      thumbnail: {
        url: 'test.jpg',
        height: 120,
        width: 120,
      },
      categories: [{
        id: 1,
        name: 'Comedy',
      }, ],
    },
    title: 'Brian Redban',
    subtitle: 'Joe & Redban talk shit',
  }, ],
  isLoggedIn: false,
  onStartPlayer: jest.fn(),
  onStopPlayer: jest.fn(),
  onAddBookmark: jest.fn(),
  onRemoveBookmark: jest.fn(),
};

it('should render the component', () => {
  const rendered = shallow(<EpisodeList {...defaultProps} />);
  expect(rendered.find(Pager).length).toEqual(1);
  expect(rendered.find(Episode).length).toEqual(1);
});

it('should hide the pager if next and previous empty', () => {
  const rendered = shallow(<EpisodeList {...defaultProps} next="" previous="" />);
  expect(rendered.find(Pager).length).toEqual(0);
});
