export const mockRouter = () => {
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

export const mockLocation = () => {
  return {
    search: '',
    action: '',
    pathname: '/',
    query: {},
  };
};

export const mockCategory = () => {
  return {
    id: 1,
    name: 'Comedy',
  };
};

export const mockCategories = () => {
  return [
    mockCategory(),
  ];
};

export const mockChannel = () => {
  return {
    id: 1,
    subscribed: false,
    name: 'The Joe Rogan Experience',
    categories: mockCategories(),
    explicit: true,
    website: 'https://',
    rssFeed: 'https://',
    thumbnail: {
      url: 'test.jpg',
      height: 120,
      width: 120,
    },

  };
};


export const mockEpisode = () => {
  return {
    id: 1,
    title: 'Brian Redban',
    playing: false,
    bookmarked: false,
    subscribed: false,
    channel: mockChannel(),
    explicit: true,
  };
};

export const mockChannelActions = () => {
  return {
    onSubscribe: jest.fn(),
    onUnsubscribe: jest.fn(),
  };
};

export const mockEpisodeActions = () => {
  return {
    onStartPlayer: jest.fn(),
    onStopPlayer: jest.fn(),
    onAddBookmark: jest.fn(),
    onRemoveBookmark: jest.fn(),
    onSubscribe: jest.fn(),
    onUnsubscribe: jest.fn(),
  };
};
