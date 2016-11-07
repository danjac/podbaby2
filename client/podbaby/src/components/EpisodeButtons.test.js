import React from 'react';

import { shallow } from 'enzyme';

import * as bs from 'react-bootstrap';

import {
  mockEpisode,
  mockEpisodeActions,
} from '../test-utils/mocks';

import { EpisodeButtons } from './EpisodeButtons';

const createDefaultProps = () => {
  return {
    episode: mockEpisode(),
    authenticated: false,
    withChannel: true,
    ...mockEpisodeActions(),
  };
};

it('should render the component', () => {
  // smoke test
  const rendered = shallow(<EpisodeButtons {...createDefaultProps()} />);
  expect(rendered.find(bs.ButtonGroup).length).toEqual(3);
});

it('should enable play button if not playing', () => {
  const defaultProps = createDefaultProps();
  const episode = {...defaultProps.episode,
    playing: false,
  };
  const props = {...defaultProps,
    episode,
  };
  const rendered = shallow(<EpisodeButtons {...props} />);
  const btnGroup = rendered.find(bs.ButtonGroup);
  const startBtn = btnGroup.find('[title="Play"]');
  expect(startBtn.length).toBe(1);
  startBtn.simulate('click');
  expect(props.onStartPlayer).toBeCalled();
});

it('should enable stop button if playing', () => {
  const defaultProps = createDefaultProps();
  const episode = {...defaultProps.episode,
    playing: true,
  };
  const props = {...defaultProps,
    episode,
  };
  const rendered = shallow(<EpisodeButtons {...props} />);
  const btnGroup = rendered.find(bs.ButtonGroup);
  const stopBtn = btnGroup.find('[title="Stop"]');
  expect(stopBtn.length).toBe(1);
  stopBtn.simulate('click');
  expect(props.onStopPlayer).toBeCalled();
});

it('should show a bookmark button if user is logged in', () => {
  const props = {...createDefaultProps(),
    authenticated: true,
  };
  const rendered = shallow(<EpisodeButtons {...props} />);
  const btnGroup = rendered.find(bs.ButtonGroup);
  expect(btnGroup.find('[title="Bookmark this podcast"]').length).toBe(1);

});

it('should not show a bookmark button if user is logged in', () => {
  const props = {...createDefaultProps(),
    authenticated: false,
  };
  const rendered = shallow(<EpisodeButtons {...props} />);
  const btnGroup = rendered.find(bs.ButtonGroup);
  expect(btnGroup.find('[title="Bookmark this podcast"]').length).toBe(0);
});

it('should show a subscribe button if user is logged in', () => {
  const defaults = createDefaultProps();
  const props = {...defaults,
    episode: {
      ...defaults.episode,
      subscribed: false,
    },
    authenticated: true,
    withChannel: true,
  };
  const rendered = shallow(<EpisodeButtons {...props} />);
  const btnGroup = rendered.find(bs.ButtonGroup);
  expect(btnGroup.find('[title="Subscribe to The Joe Rogan Experience"]').length).toBe(1);

});

it('should not show a subscribe or unsubscribe button if withChannel is false', () => {
  const props = {...createDefaultProps(),
    authenticated: true,
    withChannel: false,
  };
  const rendered = shallow(<EpisodeButtons {...props} />);
  const btnGroup = rendered.find(bs.ButtonGroup);
  expect(btnGroup.find('[title="Subscribe to The Joe Rogan Experience"]').length).toBe(0);
  expect(btnGroup.find('[title="Unsubscribe from The Joe Rogan Experience"]').length).toBe(0);
});


it('should not show a subscribe button if channel subscribe', () => {
  const defaultProps = createDefaultProps();
  const props = {
    ...defaultProps,
    episode: {
      ...defaultProps.episode,
      subscribed: true,
    },
    authenticated: true,
  };
  const rendered = shallow(<EpisodeButtons {...props} />);
  const btnGroup = rendered.find(bs.ButtonGroup);
  expect(btnGroup.find('[title="Subscribe to The Joe Rogan Experience"]').length).toBe(0);

});


it('should not show a bookmark button if user is logged in', () => {
  const props = {
    ...createDefaultProps(),
    authenticated: false,
  };
  const rendered = shallow(<EpisodeButtons {...props} />);
  const btnGroup = rendered.find(bs.ButtonGroup);
  expect(btnGroup.find('[title="Subscribe to The Joe Rogan Experience"]').length).toBe(0);
});
