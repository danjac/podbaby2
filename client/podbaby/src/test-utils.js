export const fakeRouter = () => {
  return {
    replace: jest.fn(),
    push: jest.fn(),
    go: jest.fn(),
    goBack: jest.fn(),
    goForward: jest.fn(),
    setRouteLeaveHook: jest.fn(),
    isActive: () => true,
  };
};

export const fakeLocation = () => {
  return {
    search: '',
    action: '',
    pathname: '/',
    query: {},
  };
};

export const fakeEpisode = () => {
  return {
    id: 1,
    playing: false,
    bookmarked: false,
    subscribed: false,
    channel: {
      id: 1,
      name: 'The Joe Rogan Experience',
      categories: [
        {
          id: 1,
          name: 'Comedy',
        },
      ],
    },
    explicit: true,
  };
};

export const fakeEpisodeActions = () => {
  return {
    onStartPlayer: jest.fn(),
    onStopPlayer: jest.fn(),
    onAddBookmark: jest.fn(),
    onRemoveBookmark: jest.fn(),
    onSubscribe: jest.fn(),
    onUnsubscribe: jest.fn(),
  };
};
