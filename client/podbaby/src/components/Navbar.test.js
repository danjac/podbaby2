import React from 'react';
import { shallow } from 'enzyme';

import Navbar from './Navbar';

it('should render the component', () => {

  const props = {
    onLogout: jest.fn(),
    auth: {
      authenticated: false,
      user: null,
    },
  };

  const rendered = shallow(<Navbar {...props} />);
  expect(rendered).toBeTruthy();
});
