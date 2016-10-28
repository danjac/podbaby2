import React from 'react';
import { shallow, mount } from 'enzyme';
import * as bs from 'react-bootstrap';
import { Search } from './Search';

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

it('should run search if submitted', () => {
  const props = {...defaultProps, onSearch: jest.fn()};
  const rendered = mount(<Search {...props} />);
  const form = rendered.find('form');
  form.simulate('submit');
  expect(props.onSearch.mock.calls.length).toBe(1);
});

it('should not run search if empty', () => {
  const props = {...defaultProps, searchQuery: '', onSearch: jest.fn()};
  const rendered = mount(<Search {...props} />);
  const form = rendered.find('form');
  form.simulate('submit');
  expect(props.onSearch.mock.calls.length).toBe(0);
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
