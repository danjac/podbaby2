import React from 'react';
import { shallow } from 'enzyme';

import {  NavContainer } from './NavContainer';

it('should render the container', () => {
  const props = {
    user: null,
    authenticated: false,
    onLogout: jest.fn(),
  };

  const rendered = shallow(<NavContainer {...props} />);
  expect(rendered).toBeTruthy();
});
