import React from 'react';
import { shallow } from 'enzyme';

import Pager from './Pager';
import EpisodeListItem from './EpisodeListItem';
import EpisodeList from './EpisodeList';


const defaultProps = {
  next: 3,
  previous: 1,
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
  authenticated: false,
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
  expect(rendered.find(EpisodeListItem).length).toEqual(1);
});

it('should show empty message if no episodes', () => {
  const rendered = shallow(<EpisodeList {...defaultProps} episodes={[]} />);
  expect(rendered.text()).toContain('No podcasts found');
  expect(rendered.find(Pager).length).toEqual(0);
  expect(rendered.find(EpisodeListItem).length).toEqual(0);
});

it('should show empty message if a message passed', () => {
  const rendered = shallow(<EpisodeList {...defaultProps} episodes={[]} ifEmpty="No episodes!!!" />);
  expect(rendered.text()).toContain('No episodes!!!');
  expect(rendered.find(Pager).length).toEqual(0);
  expect(rendered.find(EpisodeListItem).length).toEqual(0);
});


it('should hide the pager if next and previous empty', () => {
  const rendered = shallow(<EpisodeList {...defaultProps} next={0} previous={0} />);
  expect(rendered.find(Pager).length).toEqual(0);
});
