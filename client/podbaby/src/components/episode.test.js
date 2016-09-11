import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Label } from 'react-bootstrap';
import { Episode } from './episode';

class Wrapper extends React.Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

it('should render the component', () => {
  // smoke test
  const props = {
    episode: {
      explicit: true,
      channel: {
        name: 'The Joe Rogan Experience',
        thumbnail: {
          url: 'test.jpg',
          height: 200,
          width: 200,
        },
        categories: [
          {
            id: 1,
            name: 'Comedy',
          },
        ],
      },
      title: 'Brian Redban',
      subtitle: 'Joe & Redban talk shit',
    },
    player: {
      isPlaying: false,
      episode: null,
    },
    onStart: jest.fn(),
    onStop: jest.fn(),
  };

  const rendered = TestUtils.renderIntoDocument(
    <Wrapper><Episode {...props} /></Wrapper>
  );
  const labels = TestUtils.scryRenderedComponentsWithType(rendered, Label);
  expect(labels.length).toBe(2);

  const header = TestUtils.findRenderedDOMComponentWithTag(rendered, 'h5');
  expect(header.textContent).toBe('Brian Redban');

  const button = TestUtils.findRenderedDOMComponentWithTag(rendered, 'button');
  TestUtils.Simulate.click(button);
  expect(props.onStart).toBeCalled();


});


