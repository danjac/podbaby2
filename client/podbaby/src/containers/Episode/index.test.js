import React from 'react';
import { shallow, mount } from 'enzyme';

import { mockEpisode, mockEpisodeActions } from '../../mocks';

import { Episode } from './index';

const defaultProps = () => ({
  episode: mockEpisode(),
  params: { id: 1 },
  dispatch: jest.fn(),
  authenticated: false,
  loading: false,
  ...mockEpisodeActions(),
});

it('should render the container', () => {
  const props = defaultProps();
  const rendered = shallow(<Episode {...props} />);
  expect(rendered).toBeTruthy();
});

it('should fetch episode on mount', () => {
  const props = defaultProps();
  mount(<Episode {...props} />);
  expect(props.dispatch).toBeCalled();
});

it('should fetch episode if id parameter changes', () => {
  const props = defaultProps();
  const rendered = mount(<Episode {...props} />);
  rendered.setProps({ params: { id: 2 }});
  expect(props.dispatch).toBeCalled();
});
