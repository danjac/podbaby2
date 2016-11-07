export const requireAuth = (store, nextState, replace) => {
  const { authenticated } = store.getState().auth;
  if (!authenticated) {
    replace({
      pathname: '/login/',
    });
  }
};

export const resolveDefaultPage = (store, nextState, replace) => {
  const { authenticated } = store.getState().auth;
  const pathname = authenticated ? '/podcasts/me/' : '/podcasts/all/';
  replace({ pathname });
};
