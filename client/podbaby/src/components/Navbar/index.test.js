import React from 'react';
import { shallow } from 'enzyme';

import Navbar from './index';

it('should render the component', () => {

  const props = {
    onLogout: jest.fn(),
    authenticated: false,
    user: null,
  };

  const rendered = shallow(<Navbar {...props} />);
  expect(rendered).toBeTruthy();
});
