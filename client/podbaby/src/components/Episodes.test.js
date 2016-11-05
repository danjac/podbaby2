import React from 'react';
import { shallow } from 'enzyme';

import Episodes from './Episodes';
  const defaultProps = {
    episodes: [
      {
        id: 1,
        title: 'test',
      },
    ],
    next: 0,
    previous: 0,
    router: {},
    location: {
      query: '',
    },
    loading: false,
    authenticated: false,
    onSearch: jest.fn(),
    onSelectPage: jest.fn(),
    onClearSearch: jest.fn(),
    onStartPlayer: jest.fn(),
    onStopPlayer: jest.fn(),
    onAddBookmark: jest.fn(),
    onRemoveBookmark: jest.fn(),
    onSubscribe: jest.fn(),
    onUnsubscribe: jest.fn(),
  };

it('should render the component', () => {
  const rendered = shallow(<Episodes {...defaultProps} />);
  expect(rendered).toBeTruthy();
});
