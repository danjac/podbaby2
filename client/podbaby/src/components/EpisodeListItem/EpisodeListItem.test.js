import React from 'react';
import { shallow } from 'enzyme';
import * as bs from 'react-bootstrap';

import {
  mockEpisode,
  mockEpisodeActions,
} from '../../mocks';

import { EpisodeListItem } from './EpisodeListItem';

const defaultProps = () => {
  return {
    episode: mockEpisode(),
    authenticated: false,
    ...mockEpisodeActions(),
  };
};

it('should render the component', () => {
  // smoke test
  const props = defaultProps();
  const rendered = shallow(<EpisodeListItem {...props} />);
  const panel = rendered.find(bs.Panel);
  expect(panel.prop('header')).toBeDefined();
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


