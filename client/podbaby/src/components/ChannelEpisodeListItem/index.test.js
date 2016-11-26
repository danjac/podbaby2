import React from 'react';
import { shallow } from 'enzyme';
import * as bs from 'react-bootstrap';

import {
  mockEpisode,
  mockEpisodeActions,
} from '../../mocks';

import { ChannelEpisodeListItem } from './index';

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
  const rendered = shallow(<ChannelEpisodeListItem {...props} />);
  const panel = rendered.find(bs.Panel);
  expect(panel.prop('header')).toBeDefined();
});
