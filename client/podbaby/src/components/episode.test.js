import React from 'react';
import { shallow } from 'enzyme';
import * as bs from 'react-bootstrap';
import { Episode } from './episode';

const defaultProps = {
  episode: {
    explicit: true,
    channel: {
      name: 'The Joe Rogan Experience',
      thumbnail: {
        url: 'test.jpg',
        height: 200,
        width: 200,
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
  player: {
    isPlaying: false,
    episode: null,
  },
  isLoggedIn: false,
  onStart: jest.fn(),
  onStop: jest.fn(),
};

it('should render the component', () => {
  // smoke test
  const rendered = shallow(<Episode {...defaultProps} />);
  expect(rendered.find('h5').text()).toContain('Brian Redban');
});

it('should enable play button if not playing', () => {
  const props = {...defaultProps};
  const rendered = shallow(<Episode {...props} />);
  rendered.find(bs.Button).simulate('click');
  expect(props.onStart).toBeCalled();
});

it('should enable stop button if playing', () => {
  const player = {
    isPlaying: true,
    episode: defaultProps.episode,
  };
  const props = {...defaultProps, player};
  const rendered = shallow(<Episode {...props} />);
  rendered.find(bs.Button).simulate('click');
  expect(props.onStop).toBeCalled();
});

it('should show a bookmark button if user is logged in', () => {
  const props = {...defaultProps, isLoggedIn: true };
  const rendered = shallow(<Episode {...props} />);
  expect(rendered.find('Icon', { name: "bookmark" })).toBeTruthy();
});

it('should not show a bookmark button if user is logged in', () => {
  const props = {...defaultProps, isLoggedIn: false };
  const rendered = shallow(<Episode {...props} />);
  expect(rendered.contains('Icon', { name: "bookmark" })).toBeFalsy();
});



