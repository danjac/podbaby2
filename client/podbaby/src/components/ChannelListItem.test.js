import React from 'react';
import { shallow } from 'enzyme';

import { mockChannel, mockChannelActions} from '../test-utils/mocks';

import ChannelListItem from './ChannelListItem';

it('should render the component', () => {
  const props = {
    channel: mockChannel(),
    ...mockChannelActions(),
  };

  const rendered = shallow(<ChannelListItem {...props} />);
  expect(rendered).toBeTruthy();
});

