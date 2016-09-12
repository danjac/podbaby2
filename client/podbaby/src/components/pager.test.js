import React from 'react';
import { shallow } from 'enzyme';
import Pager from './pager';

it('should enable previous and next buttons if present', () => {
  const props = {
    next: '/api/episodes/?page=3',
    previous: '/api/episodes/?page=1',
    onSelect: jest.fn(),
  };
  const rendered = shallow(<Pager {...props} />);
  expect(rendered.find({ disabled: true }).length).toBe(0);
});

it('should disable previous button if url absent', () => {
  const props = {
    next: '/api/episodes/?page=3',
    previous: null,
    onSelect: jest.fn(),
  };
  const rendered = shallow(<Pager {...props} />);
  expect(rendered.find({ previous: true, disabled: true }).length).toBe(1);
});

it('should disable next button if url absent', () => {
  const props = {
    previous: '/api/episodes/?page=3',
    next: null,
    onSelect: jest.fn(),
  };
  const rendered = shallow(<Pager {...props} />);
  expect(rendered.find({ next: true, disabled: true }).length).toBe(1);
});


it('should enable the correct select buttons', () => {

  let selectedUrl;

  const props = {
    next: '/api/episodes/?page=3',
    previous: '/api/episodes/?page=1',
    onSelect: (url) => {
      selectedUrl = url;
    },
  };
  const rendered = shallow(<Pager {...props} />);

  rendered.find({ previous: true }).simulate('select');
  expect(selectedUrl).toBe('/api/episodes/?page=1');

  rendered.find({ next: true }).simulate('select');
  expect(selectedUrl).toBe('/api/episodes/?page=3');
});


