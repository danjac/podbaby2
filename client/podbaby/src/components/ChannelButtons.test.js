import React from 'react';
import { shallow } from 'enzyme';
import * as bs from 'react-bootstrap';

import { mockChannel, mockChannelActions } from '../test-utils/mocks';

import ChannelButtons from './ChannelButtons';

const defaultProps = () => {
  return {
    channel: mockChannel(),
    authenticated: false,
    ...mockChannelActions(),
  };
};

it('should render the component', () => {
  // smoke test
  const rendered = shallow(<ChannelButtons {...defaultProps()} />);
  expect(rendered.find(bs.ButtonGroup).length).toEqual(2);
});


