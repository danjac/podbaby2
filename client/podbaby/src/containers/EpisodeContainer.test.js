import React from 'react';
import { shallow, mount } from 'enzyme';

import { mockEpisode, mockEpisodeActions } from '../test-utils/mocks';

import { EpisodeContainer } from './EpisodeContainer';

const defaultProps = () => ({
  episode: mockEpisode(),
  params: { id: 1 },
  authenticated: false,
  loading: false,
  onFetchEpisode: jest.fn(),
  ...mockEpisodeActions(),
});

it('should render the container', () => {
  const props = defaultProps();
  const rendered = shallow(<EpisodeContainer {...props} />);
  expect(rendered).toBeTruthy();
});

it('should fetch episode on mount', () => {
  const props = defaultProps();
  mount(<EpisodeContainer {...props} />);
  expect(props.onFetchEpisode).toBeCalledWith(1);
});

it('should fetch episode if id parameter changes', () => {
  const props = defaultProps();
  const rendered = mount(<EpisodeContainer {...props} />);
  rendered.setProps({ params: { id: 2 }});
  expect(props.onFetchEpisode).toBeCalledWith(2);
});
