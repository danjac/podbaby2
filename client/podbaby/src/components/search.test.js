import React from 'react';
import { shallow } from 'enzyme';
import * as bs from 'react-bootstrap';
import { Search } from './search';

const defaultProps = {
  placeholder: 'Search...',
  searchQuery: 'test',
  onSearch: jest.fn(),
  onClear: jest.fn(),
};

it('should render the component', () => {
  const rendered = shallow(<Search {...defaultProps} />);
  expect(rendered.find('form').length).toBe(1);
  expect(rendered.find(bs.Button).length).toBe(2);
});

it('should not show the clear button if no search query ', () => {
  const rendered = shallow(<Search {...defaultProps} searchQuery="" />);
  expect(rendered.find(bs.Button).length).toBe(1);
});

it('should not show the clear button if onClear not included', () => {
  const props = {...defaultProps, onClear: undefined};
  const rendered = shallow(<Search {...props} />);
  expect(rendered.find(bs.Button).length).toBe(1);
});
