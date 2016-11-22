import React from 'react';
import { shallow } from 'enzyme';

import { Alerts } from './index';

it('should render the container', () => {
  const props = {
    alerts: [
      {
        id: 1,
        type: 'success',
        message: 'ok',
      },
    ],
    onDismiss: jest.fn(),
  };

  const rendered = shallow(<Alerts {...props} />);
  expect(rendered).toBeTruthy();
});
