import React from 'react';
import { shallow } from 'enzyme';

import Loader from './Loader';

it('should render a Loader component', () => {
  const rendered = shallow(<Loader />);
  expect(rendered).toBeTruthy();
});
