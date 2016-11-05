import React from 'react';
import { shallow } from 'enzyme';

import { AlertsContainer } from './AlertsContainer';

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

  const rendered = shallow(<AlertsContainer {...props} />);
  expect(rendered).toBeTruthy();
});
