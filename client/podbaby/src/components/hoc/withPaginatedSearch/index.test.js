import React from 'react';
import { shallow, mount } from 'enzyme';

import { mockRouter, mockLocation } from '../../../utils/testing/mocks';
import { withPaginatedSearch } from './index';

const WrapperComponent = () => <div></div>;

const defaultProps = () => {
  const defaultLocation = mockLocation();
  const location = {
    ...defaultLocation,
    query: {
      page: 1,
      q: 'test',
    },
  };
  return {
    params: {},
    router: mockRouter(),
    location,
    dispatch: jest.fn(),
  };
};

it('should render the container', () => {
  const props = defaultProps();
  const fetchData = jest.fn();
  const Component = withPaginatedSearch(WrapperComponent, fetchData);
  const rendered = shallow(<Component {...props} />);
  expect(rendered).toBeTruthy();
});

it('should call fetch on mount', () => {
  const defaults = defaultProps();
  const props = {
    ...defaults,
    location: {
      ...defaults.location,
      query: {
        page: 1,
        q: 'test',
      },
    },
  };
  const fetchData = jest.fn();
  const Component = withPaginatedSearch(WrapperComponent, fetchData);
  mount(<Component {...props} />);
  expect(fetchData).toBeCalledWith(props.dispatch, 1, 'test', {});
});

it('should call fetch if search changes', () => {
  const props = defaultProps();
  const fetchData = jest.fn();
  const Component = withPaginatedSearch(WrapperComponent, fetchData);
  const rendered = mount(<Component {...props} />);
  const location = {
    ...props.location,
    query: {
      ...props.location.query,
      q: 'test again',
    },
  };
  rendered.setProps({
    ...props,
    location,
  });
  expect(fetchData).toBeCalledWith(props.dispatch, 1, 'test again', {});
});

it('should call fetch if param changes', () => {
  const props = defaultProps();
  const fetchData = jest.fn();
  const Component = withPaginatedSearch(WrapperComponent, fetchData);
  const rendered = mount(<Component {...props} />);
  rendered.setProps({ params: { id: 2 } });
  expect(fetchData).toBeCalledWith(props.dispatch, 1, 'test', { id: 2 });
});
