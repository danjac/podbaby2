import React from 'react';
import { shallow } from 'enzyme';
import * as bs from 'react-bootstrap';

import { EpisodeListItem } from './EpisodeListItem';

import {
  mockEpisode,
  mockEpisodeActions,
} from '../mocks';

const defaultProps = () => {
  return {
    episode: mockEpisode(),
    authenticated: false,
    withChannel: true,
    ...mockEpisodeActions(),
  };
};

it('should render the component', () => {
  // smoke test
  const props = defaultProps();
  const rendered = shallow(<EpisodeListItem {...props} />);
  const panel = rendered.find(bs.Panel);
  expect(panel.prop('header')).toBe(props.episode.channel.name);
});

it('should render the channel thumbnail if provided', () => {
  const rendered = shallow(<EpisodeListItem {...defaultProps()} />);
  const img = rendered.find('img');
  expect(img.prop('src')).toBe('test.jpg');
});

it('should render the default thumbnail if not provided', () => {
  const props = defaultProps();
  const channel = {...props.episode.channel, thumbnail: null };
  const episode = {...props.episode, channel };
  const rendered = shallow(<EpisodeListItem {...props} episode={episode} />);
  const img = rendered.find('img');
  expect(img.prop('src')).not.toContain('test.jpg');
});

it('should not show channel name in header if withChannel is false', () => {
  const props = defaultProps();
  const rendered = shallow(<EpisodeListItem {...props} withChannel={false} />);
  const panel = rendered.find(bs.Panel);
  expect(panel.prop('header')).toBeUndefined();
});
