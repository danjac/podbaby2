import React from 'react';
import { shallow } from 'enzyme';

import Pager from './index';

it('should enable previous and next buttons if present', () => {
  const props = {
    next: 3,
    previous: 1,
    onSelect: jest.fn(),
  };
  const rendered = shallow(<Pager {...props} />);
  expect(rendered.find({ disabled: true }).length).toBe(0);
});

it('should disable previous button if url absent', () => {
  const props = {
    next: 3,
    previous: 0,
    onSelect: jest.fn(),
  };
  const rendered = shallow(<Pager {...props} />);
  expect(rendered.find({ previous: true, disabled: true }).length).toBe(1);
});

it('should disable next button if url absent', () => {
  const props = {
    previous: 3,
    next: 0,
    onSelect: jest.fn(),
  };
  const rendered = shallow(<Pager {...props} />);
  expect(rendered.find({ next: true, disabled: true }).length).toBe(1);
});


it('should enable the correct select buttons', () => {

  let selectedPage;

  const props = {
    next: 3,
    previous: 1,
    onSelect(page) {
      selectedPage = page;
    },
  };
  const rendered = shallow(<Pager {...props} />);

  rendered.find({ previous: true }).simulate('select');
  expect(selectedPage).toBe(1);

  rendered.find({ next: true }).simulate('select');
  expect(selectedPage).toBe(3);
});


