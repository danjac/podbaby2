import React from 'react';
import { mount } from 'enzyme';

import {
  mockRouter,
  mockLocation,
  mockEpisode,
  mockEpisodeActions,
} from '../test-utils';

import { EpisodesContainer } from './EpisodesContainer';

const defaultProps = () => {
  return {
    episodes: [
      mockEpisode(),
    ],
    loading: false,
    authenticated: false,
    location: {
      ...mockLocation(),
      query: {
        page: 1,
        q: '',
      },
    },
    router: mockRouter(),
    onFetchEpisodes: jest.fn(),
    ...mockEpisodeActions(),
  };
};

it('should fetch episodes on mount', () => {
  const props = defaultProps();
  mount(<EpisodesContainer {...props} />);
  expect(props.onFetchEpisodes).toBeCalledWith(1, '');
});

it('should fetch episodes if page or query different', () => {
  const props = defaultProps();
  const rendered = mount(<EpisodesContainer {...props} />);
  rendered.setProps({
    location: {
      ...props.location,
      query: {
        page: 2,
        q: 'test',
      },
    },
  });
  expect(props.onFetchEpisodes).toBeCalledWith(2, 'test');
});

it('should handle search', () => {
  const props = defaultProps();
  const rendered = mount(<EpisodesContainer {...props} />);
  rendered.instance().handleSearch('test');
  const query = {
    page: 1,
    q: 'test',
  };
  expect(props.router.replace).toHaveBeenCalledTimes(1);
  expect(props.router.replace).toBeCalledWith({ ...props.location, query });
});

it('should handle select page', () => {
  const defaults = defaultProps();
  const props = {
    ...defaults,
    location: {
      ...defaults.location,
      query: {
        page: 3,
        q: 'test',
      },
    },
  };
  const rendered = mount(<EpisodesContainer {...props} />);
  rendered.instance().handleSelectPage(4);
  const query = {
    page: 4,
    q: 'test',
  };
  expect(props.router.replace).toHaveBeenCalledTimes(1);
  expect(props.router.replace).toBeCalledWith({ ...props.location, query });
});

it('should handle clear search', () => {
  const defaults = defaultProps();
  const props = {
    ...defaults,
    location: {
      ...defaults.location,
      query: {
        page: 3,
        q: '',
      },
    },
  };
  const rendered = mount(<EpisodesContainer {...props} />);
  rendered.instance().handleClearSearch();
  const query = {
    page: 1,
    q: '',
  };
  expect(props.router.replace).toHaveBeenCalledTimes(1);
  expect(props.router.replace).toBeCalledWith({ ...props.location, query });
});
