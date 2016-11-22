import React from 'react';

import { shallow } from 'enzyme';

import {
  mockEpisode,
  mockEpisodeActions,
} from '../../utils/testing/mocks';

import AudioPlayer from './index';

const createDefaultProps = () => {
  return {
    authenticated: false,
    episode: mockEpisode(),
    onTimeUpdate: jest.fn(),
    ...mockEpisodeActions(),
  };
};

it('should render the component', () => {
  const props = createDefaultProps();
  const rendered = shallow(<AudioPlayer {...props} />);
  expect(rendered).toBeTruthy();
});
