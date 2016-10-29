import React from 'react';
import { shallow } from 'enzyme';
import * as bs from 'react-bootstrap';
import { EpisodeButtons } from './EpisodeButtons';

const defaultProps = {
  episode: {
    isPlaying: false,
    channel: {
      name: 'The Joe Rogan Experience',
    },
  },
  authenticated: false,
  onStartPlayer: jest.fn(),
  onStopPlayer: jest.fn(),
  onAddBookmark: jest.fn(),
  onRemoveBookmark: jest.fn(),
  onSubscribe: jest.fn(),
  onUnsubscribe: jest.fn(),
};

it('should render the component', () => {
  // smoke test
  const rendered = shallow(<EpisodeButtons {...defaultProps} />);
  expect(rendered.find(bs.ButtonGroup).length).toEqual(3);
});

it('should enable play button if not playing', () => {
  const episode = { ...defaultProps.episode, isPlaying: false };
  const props = {...defaultProps, episode };
  const rendered = shallow(<EpisodeButtons {...props} />);
  const btnGroup = rendered.find(bs.ButtonGroup);
  const startBtn = btnGroup.find('[title="Play"]');
  expect(startBtn.length).toBe(1);
  startBtn.simulate('click');
  expect(props.onStartPlayer).toBeCalled();
});

it('should enable stop button if playing', () => {
  const episode = { ...defaultProps.episode, isPlaying: true };
  const props = {...defaultProps, episode };
  const rendered = shallow(<EpisodeButtons {...props} />);
  const btnGroup = rendered.find(bs.ButtonGroup);
  const stopBtn = btnGroup.find('[title="Stop"]');
  expect(stopBtn.length).toBe(1);
  stopBtn.simulate('click');
  expect(props.onStopPlayer).toBeCalled();
});

it('should show a bookmark button if user is logged in', () => {
  const props = {...defaultProps, authenticated: true };
  const rendered = shallow(<EpisodeButtons {...props} />);
  const btnGroup = rendered.find(bs.ButtonGroup);
  expect(btnGroup.find('[title="Bookmark this podcast"]').length).toBe(1);

});

it('should not show a bookmark button if user is logged in', () => {
  const props = {...defaultProps, authenticated: false };
  const rendered = shallow(<EpisodeButtons {...props} />);
  const btnGroup = rendered.find(bs.ButtonGroup);
  expect(btnGroup.find('[title="Bookmark this podcast"]').length).toBe(0);
});

it('should show a subscribe button if user is logged in', () => {
  const props = {...defaultProps, authenticated: true };
  const rendered = shallow(<EpisodeButtons {...props} />);
  const btnGroup = rendered.find(bs.ButtonGroup);
  expect(btnGroup.find('[title="Subscribe to The Joe Rogan Experience"]').length).toBe(1);

});

it('should not show a subscribe button if no subscribe action', () => {
  const props = {...defaultProps, authenticated: true, onSubscribe: undefined };
  const rendered = shallow(<EpisodeButtons {...props} />);
  const btnGroup = rendered.find(bs.ButtonGroup);
  expect(btnGroup.find('[title="Subscribe to The Joe Rogan Experience"]').length).toBe(0);

});


it('should not show a bookmark button if user is logged in', () => {
  const props = {...defaultProps, authenticated: false };
  const rendered = shallow(<EpisodeButtons {...props} />);
  const btnGroup = rendered.find(bs.ButtonGroup);
  expect(btnGroup.find('[title="Subscribe to The Joe Rogan Experience"]').length).toBe(0);
});


