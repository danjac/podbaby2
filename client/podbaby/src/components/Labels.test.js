import React from 'react';
import { shallow, mount } from 'enzyme';
import * as bs from 'react-bootstrap';

import Labels from './Labels';

it('should render the component', () => {
  const props = {
    categories: [
      {
        id: 1,
        name: 'Comedy',
      },
    ],
    explicit: false,
  };
  const rendered = shallow(<Labels {...props} />);
  expect(rendered.find(bs.Label).length).toBe(1);
});

it('should show an explicit label', () => {
  const props = {
    categories: [
      {
        id: 1,
        name: 'Comedy',
      },
    ],
    explicit: true,
  };
  const rendered = mount(<Labels {...props} />);
  expect(rendered.find(bs.Label).length).toBe(2);
  expect(rendered.text()).toContain('Explicit');
});
