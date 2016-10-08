import React from 'react';
import { shallow } from 'enzyme';
import { LatestEpisodes } from './latest';

const defaultProps = {
  next: '/?page=3',
  previous: '/?page=1',
  episodes: [{
    id: 1,
    explicit: true,
    isPlaying: false,
    channel: {
      name: 'The Joe Rogan Experience',
      thumbnail: {
        url: 'test.jpg',
        height: 120,
        width: 120,
      },
      categories: [{
        id: 1,
        name: 'Comedy',
      }, ],
    },
    title: 'Brian Redban',
    subtitle: 'Joe & Redban talk shit',
  }, ],
  isLoggedIn: false,
  isLoading: false,
  actions: {
    onStartPlayer: jest.fn(),
    onStopPlayer: jest.fn(),
    onAddBookmark: jest.fn(),
    onRemoveBookmark: jest.fn(),
    onFetchEpisodes: jest.fn(),
  },
  router: {
    replace: jest.fn(),
  },
  location: {
    query: {
      page: 1
    }
  },
};

it('should render the component', () => {
  const rendered = shallow(<LatestEpisodes {...defaultProps} />);
  expect(rendered).toBeTruthy();
});

it('should handle page selection', () => {
  const props = {...defaultProps, router: { replace: jest.fn() }};
  const comp = new LatestEpisodes(props);
  comp.handleSelectPage('/api/episodes/?page=2');
  expect(props.router.replace).toBeCalledWith({ query: { page: 2, q: undefined }});
});
