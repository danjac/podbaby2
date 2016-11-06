import React from 'react';
import { shallow } from 'enzyme';
import * as bs from 'react-bootstrap';

import { EpisodeListItem } from './EpisodeListItem';

import {
  mockEpisode,
  mockEpisodeActions,
} from '../mocks';

const defaultProps = {
  episode: mockEpisode(),
  authenticated: false,
  ...mockEpisodeActions(),
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


