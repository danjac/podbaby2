const AUTH_TOKEN = 'auth-token';

const fakeStore = {};

export function getAuthToken() {
  return fakeStore[AUTH_TOKEN];
}

export function setAuthToken(token) {
  fakeStore[AUTH_TOKEN] = token;
}

export function removeAuthToken() {
  delete fakeStore[AUTH_TOKEN];
}
