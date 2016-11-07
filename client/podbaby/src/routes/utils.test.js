import { requireAuth, resolveDefaultPage } from './utils';

const createStore = authenticated => {
  return {
    getState() {
        return { auth: { authenticated } };
    },
  };
};

describe('resolveDefaultPage', () => {
  it('should show all podcasts if user is not authenticated', () => {
    const store = createStore(false);
    const replace = jest.fn();

    resolveDefaultPage(store, {}, replace);

    expect(replace).toBeCalledWith({ pathname: '/podcasts/all/' });
  });

  it('should show my podcasts if user is authenticated', () => {

    const store = createStore(true);
    const replace = jest.fn();

    resolveDefaultPage(store, {}, replace);

    expect(replace).toBeCalledWith({ pathname: '/podcasts/me/' });
  });
});

describe('requireAuth', () => {
  it('should redirect to login if user not authenticated', () => {

    const store = createStore(false);
    const replace = jest.fn();

    requireAuth(store, {}, replace);

    expect(replace).toBeCalledWith({ pathname: '/login/' });
  });

  it('should do nothing if user authenticated', () => {

    const store = createStore(true);
    const replace = jest.fn();

    requireAuth(store, {}, replace);

    expect(replace).not.toBeCalled();
  });
});
