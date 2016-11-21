import React from 'react';
import { mount } from 'enzyme';

import Description from './index';

it('should render the component', () => {
  const rendered = mount(<Description content={'test'} />);
  expect(rendered.text()).toBe('test');
});

it('should not render if no content', () => {
  const rendered = mount(<Description content={null} />);
  expect(rendered.text()).toBe('');
});
