import React from 'react';
import { shallow } from 'enzyme';

import { mockRouter } from '../../utils/testing/mocks';

import {  NavContainer } from './index';

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
