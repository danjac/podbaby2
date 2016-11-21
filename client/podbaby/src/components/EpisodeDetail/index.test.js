import React from 'react';
import { shallow, mount } from 'enzyme';

import { mockEpisodeActions, mockEpisode } from '../../utils/testing/mocks';

import Loader from '../Loader';
import EpisodeDetail from './index';


it('should render the component', () => {
  const props = {
    loading: false,
    authenticated: false,
    episode: mockEpisode(),
    ...mockEpisodeActions(),
  };

  const rendered = shallow(<EpisodeDetail {...props} />);
  expect(rendered).toBeTruthy();
});

it('should just render loader if loading', () => {
  const props = {
    loading: true,
    authenticated: false,
    episode: null,
    ...mockEpisodeActions(),
  };

  const rendered = shallow(<EpisodeDetail {...props} />);
  expect(rendered.find(Loader)).toBeTruthy();
});

it('should render a message if error', () => {
  const props = {
    loading: true,
    authenticated: false,
    episode: null,
    error: new Error('not found'),
    ...mockEpisodeActions(),
  };

  const rendered = mount(<EpisodeDetail {...props} />);
  expect(rendered.text()).toContain('Page not found');

});
