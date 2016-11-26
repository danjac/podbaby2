import React from 'react';
import { shallow, mount } from 'enzyme';
import * as bs from 'react-bootstrap';

import { mockEpisode, mockEpisodeActions } from '../../mocks';

import Pager from '../Pager';
import EpisodeListItem from '../EpisodeListItem';
import EpisodeList from '../EpisodeList';

const defaultProps = {
  next: 3,
  previous: 1,
  onSelectPage: jest.fn(),
  episodes: [mockEpisode()],
  authenticated: false,
  ...mockEpisodeActions(),
};


it('should render the component', () => {
  const rendered = shallow(<EpisodeList {...defaultProps} />);
  expect(rendered.find(Pager).length).toEqual(1);
  expect(rendered.find(EpisodeListItem).length).toEqual(1);
});

it('should show empty message if no episodes', () => {
  const rendered = mount(<EpisodeList {...defaultProps} episodes={[]} />);
  expect(rendered.find(bs.Well).text()).toContain('No podcasts found');
  expect(rendered.find(Pager).length).toEqual(0);
  expect(rendered.find(EpisodeListItem).length).toEqual(0);
});

it('should show empty message if a message passed', () => {
  const rendered = mount(<EpisodeList {...defaultProps} episodes={[]} ifEmpty="No episodes!!!" />);
  expect(rendered.find(bs.Well).text()).toContain('No episodes!!!');
  expect(rendered.find(Pager).length).toEqual(0);
  expect(rendered.find(EpisodeListItem).length).toEqual(0);
});


it('should hide the pager if next and previous empty', () => {
  const rendered = shallow(<EpisodeList {...defaultProps} next={0} previous={0} />);
  expect(rendered.find(Pager).length).toEqual(0);
});
