import React from 'react';
import { shallow, mount } from 'enzyme';
import * as bs from 'react-bootstrap';
import SearchForm from './SearchForm';

const defaultProps = {
  placeholder: 'Search...',
  searchQuery: 'test',
  onSearch: jest.fn(),
  onClearSearch: jest.fn(),
};

it('should render the component', () => {
  const rendered = shallow(<SearchForm {...defaultProps} />);
  expect(rendered.find('form').length).toBe(1);
  expect(rendered.find(bs.Button).length).toBe(2);
});

it('should run search if submitted', () => {
  const props = {...defaultProps, onSearch: jest.fn()};
  const rendered = mount(<SearchForm {...props} />);
  const form = rendered.find('form');
  form.simulate('submit');
  expect(props.onSearch.mock.calls.length).toBe(1);
});

it('should not run search if empty', () => {
  const props = {...defaultProps, searchQuery: '', onSearch: jest.fn()};
  const rendered = mount(<SearchForm {...props} />);
  const form = rendered.find('form');
  form.simulate('submit');
  expect(props.onSearch.mock.calls.length).toBe(0);
});

it('should not show the clear button if no search query ', () => {
  const rendered = shallow(<SearchForm {...defaultProps} searchQuery="" />);
  expect(rendered.find(bs.Button).length).toBe(1);
});
