import React from 'react';
import { shallow } from 'enzyme';
import * as bs from 'react-bootstrap';
import { Episode } from './episode';

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
  const rendered = shallow(<Episode {...defaultProps} />);
  expect(rendered.find(bs.Panel).length).toEqual(1);
});

it('should render the channel thumbnail if provided', () => {
  const rendered = shallow(<Episode {...defaultProps} />);
  const img = rendered.find('img');
  expect(img.prop('src')).toBe('test.jpg');
});

it('should render the default thumbnail if not provided', () => {
  const channel = { ...defaultProps.episode.channel, thumbnail: null};
  const episode = { ...defaultProps.episode, channel };
  const rendered = shallow(<Episode {...defaultProps} episode={episode} />);
  const img = rendered.find('img');
  expect(img.prop('src')).not.toContain('test.jpg');
});

it('should enable play button if not playing', () => {
  const episode = { ...defaultProps.episode, isPlaying: false };
  const props = {...defaultProps, episode };
  const rendered = shallow(<Episode {...props} />);
  const panel = rendered.find(bs.Panel);
  // element is a prop, so need to render it separately
  const btnGroup = shallow(panel.prop('footer'));
  const startBtn = btnGroup.find('[title="Play"]');
  expect(startBtn.length).toBe(1);
  startBtn.simulate('click');
  expect(props.onStartPlayer).toBeCalled();
});

it('should enable stop button if playing', () => {
  const episode = { ...defaultProps.episode, isPlaying: true };
  const props = {...defaultProps, episode };
  const rendered = shallow(<Episode {...props} />);
  const panel = rendered.find(bs.Panel);
  // element is a prop, so need to render it separately
  const btnGroup = shallow(panel.prop('footer'));
  const stopBtn = btnGroup.find('[title="Stop"]');
  expect(stopBtn.length).toBe(1);
  stopBtn.simulate('click');
  expect(props.onStopPlayer).toBeCalled();
});

it('should show a bookmark button if user is logged in', () => {
  const props = {...defaultProps, isLoggedIn: true };
  const rendered = shallow(<Episode {...props} />);
  const panel = rendered.find(bs.Panel);
  // element is a prop, so need to render it separately
  const btnGroup = shallow(panel.prop('footer'));
  expect(btnGroup.find('[title="Bookmark this podcast"]').length).toBe(1);

});

it('should not show a bookmark button if user is logged in', () => {
  const props = {...defaultProps, isLoggedIn: false };
  const rendered = shallow(<Episode {...props} />);
  const panel = rendered.find(bs.Panel);
  // element is a prop, so need to render it separately
  const btnGroup = shallow(panel.prop('footer'));
  expect(btnGroup.find('[title="Bookmark this podcast"]').length).toBe(0);
});

it('should show a subscribe button if user is logged in', () => {
  const props = {...defaultProps, isLoggedIn: true };
  const rendered = shallow(<Episode {...props} />);
  const panel = rendered.find(bs.Panel);
  // element is a prop, so need to render it separately
  const btnGroup = shallow(panel.prop('footer'));
  expect(btnGroup.find('[title="Subscribe to The Joe Rogan Experience"]').length).toBe(1);

});

it('should not show a bookmark button if user is logged in', () => {
  const props = {...defaultProps, isLoggedIn: false };
  const rendered = shallow(<Episode {...props} />);
  const panel = rendered.find(bs.Panel);
  // element is a prop, so need to render it separately
  const btnGroup = shallow(panel.prop('footer'));
  expect(btnGroup.find('[title="Subscribe to The Joe Rogan Experience"]').length).toBe(0);
});



