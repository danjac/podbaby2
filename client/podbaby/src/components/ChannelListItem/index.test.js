import React from 'react';
import { shallow } from 'enzyme';

import { mockChannel, mockChannelActions} from '../../mocks';

import ChannelListItem from './index';

it('should render the component', () => {
  const props = {
    channel: mockChannel(),
    authenticated: false,
    ...mockChannelActions(),
  };

  const rendered = shallow(<ChannelListItem {...props} />);
  expect(rendered).toBeTruthy();
});

