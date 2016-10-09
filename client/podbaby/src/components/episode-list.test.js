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
  onSubscribe: jest.fn(),
  onUnsubscribe: jest.fn(),
};


it('should render the component', () => {
  const rendered = shallow(<EpisodeList {...defaultProps} />);
  expect(rendered.find(Pager).length).toEqual(1);
  expect(rendered.find(Episode).length).toEqual(1);
});

it('should show empty message if no episodes', () => {
  const rendered = shallow(<EpisodeList {...defaultProps} episodes={[]} />);
  expect(rendered.text()).toContain('No episodes found');
  expect(rendered.find(Pager).length).toEqual(0);
  expect(rendered.find(Episode).length).toEqual(0);
});

it('should show empty message if a message passed', () => {
  const rendered = shallow(<EpisodeList {...defaultProps} episodes={[]} ifEmpty="No episodes!!!" />);
  expect(rendered.text()).toContain('No episodes!!!');
  expect(rendered.find(Pager).length).toEqual(0);
  expect(rendered.find(Episode).length).toEqual(0);
});


it('should hide the pager if next and previous empty', () => {
  const rendered = shallow(<EpisodeList {...defaultProps} next="" previous="" />);
  expect(rendered.find(Pager).length).toEqual(0);
});
