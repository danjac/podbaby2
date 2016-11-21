import React from 'react';
import { shallow } from 'enzyme';
import Alerts, { Alert } from './index';

it('should render a list of alerts', () => {
  const alerts = [
    {
      id: '1',
      style: 'success',
      message: 'it works',
    },
    {
      id: '2',
      style: 'warning',
      message: 'it fails',
    },
  ];
  const props = {
    alerts,
    onDismiss: jest.fn(),
  };
  const rendered = shallow(<Alerts {...props} />);
  expect(rendered.find(Alert).length).toBe(2);

});
