import React from 'react';
import { shallow } from 'enzyme';

import { mockRouter } from '../test-utils/mocks';

import {  NavContainer } from './NavContainer';

it('should render the container', () => {
  const props = {
    user: null,
    authenticated: false,
    dispatch: jest.fn(),
    router: mockRouter(),
  };

  const rendered = shallow(<NavContainer {...props} />);
  expect(rendered).toBeTruthy();
});
