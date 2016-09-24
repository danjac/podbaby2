import React from 'react';
import { shallow } from 'enzyme';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';
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
};

it('should render the component', () => {
  // smoke test
  const rendered = shallow(<Episode {...defaultProps} />);
  expect(rendered.find('h5').text()).toContain('Brian Redban');
});

it('should render the channel thumbnail if provided', () => {
  const rendered = shallow(<Episode {...defaultProps} />);
  expect(rendered.contains(
    <img src="test.jpg" alt="The Joe Rogan Experience" height={120} width={120} />)).toBeTruthy();
});

it('should enable play button if not playing', () => {
  const props = {...defaultProps};
  const rendered = shallow(<Episode {...props} />);
  rendered.find(bs.Button).simulate('click');
  expect(props.onStartPlayer).toBeCalled();
});

it('should enable stop button if playing', () => {
  const episode = { ...defaultProps.episode, isPlaying: true };
  const props = {...defaultProps, episode };
  const rendered = shallow(<Episode {...props} />);
  rendered.find(bs.Button).simulate('click');
  expect(props.onStopPlayer).toBeCalled();
});

it('should show a bookmark button if user is logged in', () => {
  const props = {...defaultProps, isLoggedIn: true };
  const rendered = shallow(<Episode {...props} />);
  expect(rendered.contains(<Icon name="bookmark" />)).toBeTruthy();
});

it('should not show a bookmark button if user is logged in', () => {
  const props = {...defaultProps, isLoggedIn: false };
  const rendered = shallow(<Episode {...props} />);
  expect(rendered.contains(<Icon name="bookmark" />)).toBeFalsy();
});



